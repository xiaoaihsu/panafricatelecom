"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PayFastCancelPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8 max-w-md w-full text-center shadow-xl">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Payment Cancelled</h2>
        <p className="text-zinc-500 mb-6">
          Your PayFast payment was cancelled. No charges have been made.
        </p>
        <div className="space-y-3">
          <Link href="/cart" className="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
            Back to Cart
          </Link>
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-700">
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
}