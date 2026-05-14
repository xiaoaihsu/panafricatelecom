"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Filter } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";

const categories = [
  { value: "all", label: "All Products" },
  { value: "connectivity", label: "Connectivity" },
  { value: "equipment", label: "Equipment" },
  { value: "cctv", label: "CCTV" },
  { value: "renewable", label: "Solar & Renewable" },
  { value: "voip", label: "VoIP" },
];

function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    dispatch({ type: "ADD_ITEM", product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden group hover:shadow-lg transition-all">
      <div className="aspect-video bg-zinc-100 dark:bg-zinc-700 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">{product.name}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-3">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            R{product.price.toLocaleString()}
          </span>
          <span className={`text-sm ${product.stock > 5 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
            {product.stock > 5 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={cn(
              "flex-1 py-2.5 rounded-lg font-medium text-sm transition-all",
              added
                ? "bg-green-500 text-white"
                : product.stock === 0
                ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            {added ? "Added!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
          <Link
            href={`/shop/${product.slug}`}
            className="px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg font-medium text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { itemCount } = useCart();

  useEffect(() => {
    fetch("/api/products/manage")
      .then((r) => r.json())
      .then((data) => { setProducts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setProducts([]); setLoading(false); });
  }, []);

  const filtered = category === "all" ? products : products.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Telecom Shop</h1>
              <p className="text-blue-200">Equipment, gadgets, and accessories for your connectivity needs</p>
            </div>
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="md:w-56 flex-shrink-0">
            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 sticky top-24">
              <div className="flex items-center gap-2 mb-4 text-zinc-700 dark:text-zinc-300">
                <Filter className="w-4 h-4" />
                <span className="font-medium">Categories</span>
              </div>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                      category === cat.value
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              {loading ? "Loading products..." : `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
            </p>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => <div key={i} className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 h-72 animate-pulse" />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-12 text-center">
                <p className="text-zinc-500">No products found. <Link href="/admin" className="text-blue-600 hover:underline">Add products via the admin panel</Link>.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}