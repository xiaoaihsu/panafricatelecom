import { NextRequest, NextResponse } from "next/server";
import { verifyPayFastSignature, validatePaymentWithPayFast } from "@/lib/payfast";
import fs from "fs";
import path from "path";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

interface Order {
  id: string;
  status: string;
  total: number;
  paymentMethod: string;
  customer: { name: string; email: string };
  items: Array<{ name: string; price: number; quantity: number }>;
  createdAt: string;
}

function getOrders(): Order[] {
  try {
    if (!fs.existsSync(ORDERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8")) as Order[];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  const dir = path.dirname(ORDERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

function updateOrderStatus(orderId: string, status: string) {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    saveOrders(orders);
    return true;
  }
  return false;
}

/**
 * PayFast ITN (Instant Transaction Notification) callback
 * PayFast POSTs to this endpoint when a payment is confirmed
 */
export async function POST(req: NextRequest) {
  try {
    // Parse form data from PayFast
    const formData = await req.formData();
    const params: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      params[key] = value.toString();
    }

    console.log("📥 PayFast ITN received:", params);

    // Extract key fields
    const pfPaymentId = params.pf_payment_id;
    const mPaymentId = params.m_payment_id; // our order ID
    const paymentAmount = params.amount_gross;
    const signature = params.signature;
    const token = params.token;

    // Handle subscription token (for subscription payments)
    if (token) {
      console.log("Subscription token received:", token);
      // Handle subscription — mark as processing for manual review
      if (mPaymentId) updateOrderStatus(mPaymentId, "processing");
      return new NextResponse("OK", { status: 200 });
    }

    if (!mPaymentId) {
      console.error("❌ Missing order ID in PayFast ITN");
      return new NextResponse("ERROR", { status: 400 });
    }

    // Verify signature
    if (signature && !verifyPayFastSignature(params)) {
      console.error("❌ PayFast signature verification failed for order:", mPaymentId);
      return new NextResponse("INVALID SIGNATURE", { status: 403 });
    }

    // Validate payment with PayFast server
    const isValid = await validatePaymentWithPayFast(mPaymentId, paymentAmount || "");

    if (isValid) {
      console.log(`✅ Payment verified for order ${mPaymentId}`);
      updateOrderStatus(mPaymentId, "processing");
    } else {
      console.warn(`⚠️ Payment validation returned invalid for order ${mPaymentId}`);
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("❌ PayFast ITN error:", error);
    return new NextResponse("ERROR", { status: 500 });
  }
}