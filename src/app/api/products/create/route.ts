import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, saveProduct, generateProductId, generateSlug } from "@/lib/products";
import { Product } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const product: Product = {
      id: body.id || generateProductId(),
      slug: body.slug || generateSlug(body.name || ""),
      name: body.name || "Untitled Product",
      price: Number(body.price) || 0,
      description: body.description || "",
      longDescription: body.longDescription || body.description || "",
      category: body.category || "equipment",
      image: body.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      images: Array.isArray(body.images) ? body.images : [],
      stock: Number(body.stock) || 0,
      features: Array.isArray(body.features) ? body.features : [],
    };

    const saved = saveProduct(product);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save product" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
  }
}