import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail, sendCustomerConfirmationEmail } from "@/lib/email";
import { getAllProducts, saveProduct } from "@/lib/products";
import { generatePayFastUrl } from "@/lib/payfast";
import { Product } from "@/lib/types";
import fs from "fs";
import path from "path";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");
const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: "payfast" | "eft";
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
}

function getOrders(): Order[] {
  ensureDataDir();
  if (!fs.existsSync(ORDERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8")) as Order[];
}

function saveOrderToFile(order: Order) {
  ensureDataDir();
  const orders = getOrders();
  orders.unshift(order); // newest first
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

function generateOrderId(): string {
  const orders = getOrders();
  const maxNum = orders.reduce((max, o) => {
    const match = o.id.match(/ORD-(\d+)/);
    return match ? Math.max(max, parseInt(match[1], 10)) : max;
  }, 1000);
  return `ORD-${maxNum + 1}`;
}

function updateStock(items: OrderItem[]) {
  const products = getAllProducts();
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      product.stock = Math.max(0, product.stock - item.quantity);
      saveProduct(product);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, total, customer, paymentMethod } = body;

    if (!items || !customer || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderId = generateOrderId();
    const order: Order = {
      id: orderId,
      items,
      total,
      customer,
      paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Save order to file
    saveOrderToFile(order);

    // Deduct stock
    updateStock(items);

    // Send email to sales
    const emailSent = await sendOrderEmail({
      items: items.map((i: OrderItem) => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total,
      customer,
      paymentMethod,
      orderId,
    });

    // Send customer confirmation email
    await sendCustomerConfirmationEmail({
      orderId,
      items: items.map((i: OrderItem) => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total,
      customer,
      paymentMethod,
    });

    return NextResponse.json({
      success: true,
      orderId,
      emailSent,
      payfastUrl: paymentMethod === "payfast"
        ? generatePayFastUrl({ orderId, items, total, customer })
        : null,
      message: emailSent
        ? "Order placed successfully! You will receive a confirmation shortly."
        : "Order placed but email notification failed. We will contact you shortly.",
    });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json({ error: "Failed to submit order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "Failed to read orders" }, { status: 500 });
  }
}