/**
 * PayFast Integration — Pan-Africa Telecom
 * ==========================================
 * PayFast payment gateway integration for South Africa.
 * Sandbox: https://sandbox.payfast.co.za/eng/process
 * Production: https://www.payfast.co.za/eng/process
 *
 * Required env vars (copy .env.local.example to .env.local and fill in):
 *   PAYFAST_MERCHANT_ID   - from PayFast dashboard
 *   PAYFAST_MERCHANT_KEY  - from PayFast dashboard
 *   PAYFAST_PASSPHRASE    - set in PayFast dashboard > Security
 *   SERVER_URL            - your public domain (e.g. https://panafricatelecom.co.za)
 */

// Access env vars safely
declare const process: { env: Record<string, string | undefined> };
const env = typeof process !== "undefined" && process.env
  ? process.env as Record<string, string | undefined>
  : {};

const MERCHANT_ID     = env.PAYFAST_MERCHANT_ID     ?? "21491168"; // sandbox default
const MERCHANT_KEY    = env.PAYFAST_MERCHANT_KEY     ?? "";
const PASSPHRASE      = env.PAYFAST_PASSPHRASE       ?? "";

const IS_PRODUCTION  = env.NODE_ENV === "production"
  || (env.PAYFAST_ENV ?? "") === "production";

const PAYFAST_URL         = IS_PRODUCTION
  ? "https://www.payfast.co.za/eng/process"
  : "https://sandbox.payfast.co.za/eng/process";

const PAYFAST_VALIDATE_URL = IS_PRODUCTION
  ? "https://www.payfast.co.za/eng/query/validate"
  : "https://sandbox.payfast.co.za/eng/query/validate";

const SERVER_URL = env.SERVER_URL ?? "https://panafricatelecom.co.za";

interface PayFastItem {
  name: string;
  price: number;
  quantity: number;
}

interface PayFastPaymentParams {
  orderId: string;
  items: PayFastItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
}

/**
 * Generate MD5 signature for PayFast payment
 */
function generateSignature(data: Record<string, string>): string {
  // PayFast requires passphrase
  const passphrase = PASSPHRASE;
  const orderedKeys = Object.keys(data).sort();
  const pairs = orderedKeys.map((key) => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`);
  const signatureBase = pairs.join("&") + (passphrase ? `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}` : "");
  
  // Simple MD5 implementation for Node
  const crypto = require("crypto");
  return crypto.createHash("md5").update(signatureBase).digest("hex");
}

/**
 * Generate PayFast payment URL with all required parameters
 */
export function generatePayFastUrl(params: PayFastPaymentParams): string {
  const { orderId, items, total, customer } = params;

  // Build items string (PayFast supports multiple item_name_N / item_quantity_N / item_amount_N)
  // First item we use as the main order, additional items in description
  const itemCount = Math.min(items.length, 5); // PayFast supports up to 5 line items

  const data: Record<string, string> = {
    merchant_id: MERCHANT_ID,
    merchant_key: MERCHANT_KEY,
    return_url: `${SERVER_URL}/payfast/success`,
    cancel_url: `${SERVER_URL}/payfast/cancel`,
    notify_url: `${SERVER_URL}/api/payfast/itn`,
    name_first: customer.name.split(" ")[0] || customer.name,
    name_last: customer.name.split(" ").slice(1).join(" ") || "",
    email_address: customer.email,
    cell_number: customer.phone.replace(/\D/g, ""),
    address_line_1: customer.address,
    address_line_2: "",
    city: customer.city,
    country: "ZA",
    postcode: customer.postalCode,
    m_payment_id: orderId,
    amount: total.toFixed(2),
    item_name: items.map((i) => `${i.name} x${i.quantity}`).join(", ").slice(0, 100),
    item_description: items.length > 1 ? items.slice(1).map((i) => `${i.name} x${i.quantity} - R${i.price}`).join("; ") : "",
  };

  // Add line items
  for (let i = 0; i < itemCount; i++) {
    data[`item_name_${i + 1}`] = items[i].name.slice(0, 100);
    data[`item_quantity_${i + 1}`] = String(items[i].quantity);
    data[`item_amount_${i + 1}`] = items[i].price.toFixed(2);
  }

  // Generate signature
  const signature = generateSignature(data);
  data.signature = signature;

  // Build URL
  const queryString = Object.entries(data)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join("&");

  return `${PAYFAST_URL}?${queryString}`;
}

/**
 * Verify PayFast signature from ITN callback
 */
export function verifyPayFastSignature(params: Record<string, string>): boolean {
  const signature = params.signature;
  if (!signature) return false;

  const passphrase = PASSPHRASE;
  
  // Build data string excluding signature
  const { signature: _, ...dataWithoutSig } = params;
  const orderedKeys = Object.keys(dataWithoutSig).sort();
  const pairs = orderedKeys.map((key) => {
    const value = dataWithoutSig[key];
    return `${key}=${encodeURIComponent(value as string).replace(/%20/g, "+")}`;
  });
  
  const signatureBase = pairs.join("&") + (passphrase ? `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}` : "");
  
  const crypto = require("crypto");
  const expectedSignature = crypto.createHash("md5").update(signatureBase).digest("hex");

  return signature === expectedSignature;
}

/**
 * Validate payment with PayFast server
 */
export async function validatePaymentWithPayFast(mPaymentId: string, amount: string): Promise<boolean> {
  const params = new URLSearchParams({
    merchant_id: MERCHANT_ID,
    merchant_key: MERCHANT_KEY,
    m_payment_id: mPaymentId,
    passphrase: PASSPHRASE,
  });

  try {
    const response = await fetch(`${PAYFAST_VALIDATE_URL}?${params.toString()}`, {
      method: "GET",
    });
    
    // Response should contain "VALID" or "INVALID"
    const text = await response.text();
    return text.trim().toUpperCase() === "VALID";
  } catch (error) {
    console.error("PayFast validation failed:", error);
    return false;
  }
}