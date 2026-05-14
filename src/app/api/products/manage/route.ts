import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, saveProduct, deleteProduct } from "@/lib/products";
import { Product } from "@/lib/types";

export async function GET() {
  try {
    const products = getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const existing = getAllProducts().find(p => p.id === body.id);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product: Product = {
      id: body.id,
      slug: body.slug || existing.slug,
      name: body.name ?? existing.name,
      price: Number(body.price) ?? existing.price,
      description: body.description ?? existing.description,
      longDescription: body.longDescription ?? existing.longDescription,
      category: body.category ?? existing.category,
      image: body.image ?? existing.image,
      stock: Number(body.stock) ?? existing.stock,
      features: Array.isArray(body.features) ? body.features : existing.features,
    };

    const saved = saveProduct(product);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const deleted = deleteProduct(id);
    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}