"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ShoppingCart, Check, Truck, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";
import { shippingWarranty } from "@/lib/config";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { dispatch } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data.id ? data : null);
        if (data.id) setSelectedImage(data.image);
        setLoading(false);
      })
      .catch(() => { setProduct(null); setLoading(false); });
  }, [slug]);

  const handleAdd = () => {
    if (!product) return;
    dispatch({ type: "ADD_ITEM", product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-zinc-500">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Product Not Found</h2>
          <p className="text-zinc-500 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-600">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-3">
            <div className="aspect-square bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={cn("shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors", selectedImage === product.image ? "border-blue-500" : "border-transparent opacity-60 hover:opacity-100")}
                >
                  <img src={product.image} alt="Main" className="w-full h-full object-cover" />
                </button>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={cn("shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors", selectedImage === img ? "border-blue-500" : "border-transparent opacity-60 hover:opacity-100")}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full capitalize">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mt-3">{product.name}</h1>
              <p className="text-zinc-500 mt-2">{product.description}</p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                R{product.price.toLocaleString()}
              </span>
              <span className={product.stock > 5 ? "text-green-600" : product.stock > 0 ? "text-yellow-600" : "text-red-600"}>
                {product.stock > 5 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-6">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{product.longDescription}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-zinc-300 dark:border-zinc-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className={cn(
                    "flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                    added
                      ? "bg-green-500 text-white"
                      : product.stock === 0
                      ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  )}
                >
                  {added ? (
                    <><Check className="w-5 h-5" /> Added to Cart</>
                  ) : product.stock === 0 ? (
                    "Out of Stock"
                  ) : (
                    <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                  )}
                </button>
              </div>
            </div>

            {/* Shipping info */}
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              {shippingWarranty.delivery && (
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  {shippingWarranty.delivery}
                </div>
              )}
              {shippingWarranty.warranty && (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  {shippingWarranty.warranty}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}