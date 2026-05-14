import { createTransport } from "nodemailer";

const SALES_EMAIL = "sales@panafricatelecom.co.za";
const FROM_NAME = "Pan-Africa Telecom Shop";

function createOrderEmailHtml(orderData: {
  items: Array<{ name: string; price: number; quantity: number }>;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
  orderId: string;
}): string {
  const { items, total, customer, paymentMethod, orderId } = orderData;
  const VAT_RATE = 0.15;
  const subtotal = total / (1 + VAT_RATE);
  const vatAmount = total - subtotal;
  const itemRows = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">R${item.price.toLocaleString()}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">R${(item.price * item.quantity).toLocaleString()}</td>
    </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Order #${orderId}</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="background: linear-gradient(135deg, #1e40af, #1e3a8a); padding: 24px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🛒 New Order Received</h1>
    <p style="color: #93c5fd; margin: 8px 0 0;">Pan-Africa Telecom Shop</p>
  </div>

  <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
    <!-- Order ID -->
    <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
      <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase;">Order ID</p>
      <p style="margin: 4px 0 0; font-size: 20px; font-weight: bold; color: #1e40af;">${orderId}</p>
    </div>

    <!-- Customer Details -->
    <h2 style="font-size: 14px; color: #6b7280; text-transform: uppercase; margin: 0 0 12px;">Customer Details</h2>
    <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
      <p style="margin: 0 0 4px;"><strong>${customer.name}</strong></p>
      <p style="margin: 0 0 4px;">${customer.email}</p>
      <p style="margin: 0 0 4px;">${customer.phone}</p>
      <p style="margin: 0;">${customer.address}</p>
      <p style="margin: 0;">${customer.city}, ${customer.postalCode}</p>
    </div>

    <!-- Payment Method -->
    <h2 style="font-size: 14px; color: #6b7280; text-transform: uppercase; margin: 0 0 12px;">Payment Method</h2>
    <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
      <p style="margin: 0; font-weight: bold; text-transform: uppercase;">${paymentMethod === "payfast" ? "💳 PayFast (Card/EFT/SnapScan)" : "🏦 EFT / Direct Transfer"}</p>
      <p style="margin: 8px 0 0; font-size: 13px; color: #6b7280;">
        ${paymentMethod === "eft" ? "ABSA Bank | Branch: 635001 | Acc: 4104385087 | Holder: Pan Africa Telecom (Pty) Ltd | Ref: " + orderId : "Payment link will be sent to customer separately"}
      </p>
    </div>

    <!-- Order Items -->
    <h2 style="font-size: 14px; color: #6b7280; text-transform: uppercase; margin: 0 0 12px;">Order Items</h2>
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
      <thead>
        <tr style="background: #f3f4f6;">
          <th style="padding: 12px; text-align: left; font-size: 12px; color: #6b7280;">Product</th>
          <th style="padding: 12px; font-size: 12px; color: #6b7280;">Qty</th>
          <th style="padding: 12px; text-align: right; font-size: 12px; color: #6b7280;">Unit Price</th>
          <th style="padding: 12px; text-align: right; font-size: 12px; color: #6b7280;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding: 8px 12px; text-align: right; font-size: 13px; color: #6b7280;">Subtotal (excl. VAT)</td>
          <td style="padding: 8px 12px; text-align: right; font-size: 13px; color: #6b7280;">R${subtotal.toLocaleString()}</td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 8px 12px; text-align: right; font-size: 13px; color: #6b7280;">VAT (15%)</td>
          <td style="padding: 8px 12px; text-align: right; font-size: 13px; color: #6b7280;">R${vatAmount.toLocaleString()}</td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 16px 12px; text-align: right; font-weight: bold; font-size: 18px;">TOTAL (incl. VAT)</td>
          <td style="padding: 16px 12px; text-align: right; font-weight: bold; font-size: 18px; color: #1e40af;">R${total.toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>

    <!-- Action -->
    <div style="margin-top: 24px; text-align: center;">
      <a href="https://panafricatelecom.co.za/admin" style="display: inline-block; background: #1e40af; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">
        View in Admin Panel
      </a>
    </div>
  </div>
</body>
</html>
  `;
}

interface OrderEmailData {
  items: Array<{ name: string; price: number; quantity: number }>;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
  orderId: string;
}

export async function sendOrderEmail(orderData: OrderEmailData): Promise<boolean> {
  const transporter = createTransport({
    host: "smtp.panafricatelecom.co.za",
    port: 465,
    secure: true,
    auth: {
      user: "website@panafricatelecom.co.za",
      pass: "e348p295MAr322",
    },
  });

  const html = createOrderEmailHtml(orderData);

  try {
    await transporter.sendMail({
      from: `"Pan-Africa Telecom Shop" <sales@panafricatelecom.co.za>`,
      to: SALES_EMAIL,
      replyTo: orderData.customer.email,
      subject: `🛒 New Order #${orderData.orderId} — R${orderData.total.toLocaleString()} from ${orderData.customer.name}`,
      html,
    });
    return true;
  } catch (error) {
    console.error("Failed to send order email:", error);
    return false;
  }
}

export { createOrderEmailHtml };

// ─── Customer Order Confirmation Email ─────────────────────────────────────

interface CustomerEmailData {
  orderId: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: string;
}

export async function sendCustomerConfirmationEmail(orderData: CustomerEmailData): Promise<boolean> {
  const { items, total, customer, paymentMethod, orderId } = orderData;
  const VAT_RATE = 0.15;
  const subtotal = total / (1 + VAT_RATE);
  const vatAmount = total - subtotal;

  const itemRows = items
    .map((item) => `
    <tr>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">${item.name}</td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #6b7280;">${item.quantity}</td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151;">R${item.price.toLocaleString()}</td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151;">R${(item.price * item.quantity).toLocaleString()}</td>
    </tr>`)
    .join("");

  const isEft = paymentMethod === "eft";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Confirmation #${orderId}</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="background: linear-gradient(135deg, #1e40af, #1e3a8a); padding: 24px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 22px;">✅ Order Confirmed!</h1>
    <p style="color: #93c5fd; margin: 8px 0 0;">Thank you for your order, ${customer.name}!</p>
  </div>

  <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">

    <!-- Order ID -->
    <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase;">Your Order ID</p>
      <p style="margin: 4px 0 0; font-size: 24px; font-weight: bold; color: #1e40af;">${orderId}</p>
      <p style="margin: 4px 0 0; font-size: 13px; color: #6b7280;">Please use this as your payment reference</p>
    </div>

    <!-- Payment Instructions -->
    ${isEft ? `
    <div style="background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <h2 style="margin: 0 0 12px; font-size: 16px; color: #92400e;">🏦 Bank Transfer Payment Instructions</h2>
      <p style="margin: 0 0 8px; font-size: 14px; color: #78350f;">Please make payment to the following account:</p>
      <table style="width: 100%; font-size: 14px; color: #78350f;">
        <tr><td style="padding: 4px 0; font-weight: bold; width: 120px;">Bank:</td><td style="padding: 4px 0;">ABSA Bank</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Branch:</td><td style="padding: 4px 0;">635001</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Account Holder:</td><td style="padding: 4px 0;">Pan Africa Telecom (Pty) Ltd</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Account Number:</td><td style="padding: 4px 0; font-size: 16px; font-weight: bold;">4104385087</td></tr>
        <tr><td style="padding: 4px 0; font-weight: bold;">Reference:</td><td style="padding: 4px 0; font-weight: bold; color: #1e40af;">${orderId}</td></tr>
      </table>
      <p style="margin: 12px 0 0; font-size: 13px; color: #92400e;">Please use <strong>${orderId}</strong> as your payment reference so we can identify your order.</p>
    </div>
    ` : `
    <div style="background: #ecfdf5; border: 1px solid #6ee7b7; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <h2 style="margin: 0 0 12px; font-size: 16px; color: #065f46;">💳 PayFast Payment</h2>
      <p style="margin: 0 0 12px; font-size: 14px; color: #065f46;">Our team will send you a PayFast payment link within 1 business hour.</p>
      <p style="margin: 0; font-size: 13px; color: #047857;">You will be able to pay securely via credit card, EFT, or SnapScan.</p>
    </div>
    `}

    <!-- Order Summary -->
    <h2 style="font-size: 14px; color: #6b7280; text-transform: uppercase; margin: 0 0 12px;">Order Summary</h2>
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; margin-bottom: 16px;">
      <thead>
        <tr style="background: #f3f4f6;">
          <th style="padding: 10px 12px; text-align: left; font-size: 12px; color: #6b7280;">Product</th>
          <th style="padding: 10px 12px; font-size: 12px; color: #6b7280;">Qty</th>
          <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #6b7280;">Price</th>
          <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #6b7280;">Total</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
      <tfoot><tr>
          <td colspan="3" style="padding: 8px 12px; text-align: right; font-size: 13px; color: #6b7280;">Subtotal (excl. VAT)</td>
          <td style="padding: 8px 12px; text-align: right; font-size: 13px; color: #6b7280;">R${subtotal.toLocaleString()}</td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 8px 12px; text-align: right; font-size: 13px; color: #6b7280;">VAT (15%)</td>
          <td style="padding: 8px 12px; text-align: right; font-size: 13px; color: #6b7280;">R${vatAmount.toLocaleString()}</td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 14px 12px; text-align: right; font-weight: bold; font-size: 16px; color: #374151;">TOTAL (incl. VAT)</td>
          <td style="padding: 14px 12px; text-align: right; font-weight: bold; font-size: 18px; color: #1e40af;">R${total.toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>

    <!-- Delivery Address -->
    <h2 style="font-size: 14px; color: #6b7280; text-transform: uppercase; margin: 0 0 12px;">Delivery Address</h2>
    <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
      <p style="margin: 0; color: #374151;"><strong>${customer.name}</strong></p>
      <p style="margin: 0; color: #6b7280;">${customer.address}</p>
      <p style="margin: 0; color: #6b7280;">${customer.city}, ${customer.postalCode}</p>
      <p style="margin: 4px 0 0; color: #6b7280;">📞 ${customer.phone}</p>
    </div>

    <!-- Questions -->
    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; text-align: center;">
      <p style="margin: 0 0 8px; font-size: 14px; color: #1e40af;">Questions about your order?</p>
      <p style="margin: 0; font-size: 13px; color: #3b82f6;">Email us at <a href="mailto:sales@panafricatelecom.co.za" style="color: #1d4ed8;">sales@panafricatelecom.co.za</a> or call us.</p>
    </div>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
    <p style="color: #9ca3af; font-size: 11px; text-align: center;">
      Pan-Africa Telecom (Pty) Ltd · www.panafricatelecom.co.za
    </p>
  </div>
</body>
</html>`;

  const transporter = createTransport({
    host: "smtp.panafricatelecom.co.za",
    port: 465,
    secure: true,
    auth: { user: "website@panafricatelecom.co.za", pass: "e348p295MAr322" },
  });

  try {
    await transporter.sendMail({
      from: `"Pan-Africa Telecom" <sales@panafricatelecom.co.za>`,
      to: customer.email,
      subject: `✅ Order Confirmed #${orderId} — R${total.toLocaleString()} from Pan-Africa Telecom`,
      html,
    });
    return true;
  } catch (error) {
    console.error("Failed to send customer confirmation email:", error);
    return false;
  }
}

// ─── Password Reset Email ─────────────────────────────────────────────────────

interface PasswordResetEmailData {
  to: string;
  username: string;
  resetUrl: string;
}

export async function sendPasswordResetEmail(data: PasswordResetEmailData): Promise<boolean> {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Password Reset — Pan-Africa Telecom</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <div style="background: linear-gradient(135deg, #1e40af, #1e3a8a); padding: 24px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🔑 Password Reset Request</h1>
    <p style="color: #93c5fd; margin: 8px 0 0;">Pan-Africa Telecom Admin</p>
  </div>

  <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
    <p>Hi <strong>${data.username}</strong>,</p>
    <p>We received a request to reset your admin panel password. Click the button below to set a new password:</p>

    <div style="margin: 28px 0; text-align: center;">
      <a href="${data.resetUrl}" style="display: inline-block; background: #1e40af; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">
        Reset My Password
      </a>
    </div>

    <p style="color: #6b7280; font-size: 13px;">
      This link expires in <strong>1 hour</strong>. If you didn't request this, you can safely ignore this email — your password remains unchanged.
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
    <p style="color: #9ca3af; font-size: 12px; text-align: center;">
      Pan-Africa Telecom · Admin Panel · This email was sent to ${data.to}
    </p>
  </div>
</body>
</html>`;

  const transporter = createTransport({
    host: "smtp.panafricatelecom.co.za",
    port: 465,
    secure: true,
    auth: { user: "website@panafricatelecom.co.za", pass: "e348p295MAr322" },
  });

  try {
    await transporter.sendMail({
      from: `"Pan-Africa Telecom" <sales@panafricatelecom.co.za>`,
      to: data.to,
      subject: `🔑 Password Reset — Pan-Africa Telecom Admin`,
      html,
    });
    return true;
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    return false;
  }
}