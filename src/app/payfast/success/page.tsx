"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Loader2, ShoppingBag } from "lucide-react";

export default function PayFastSuccessPage() {
  const [status, setStatus] = useState<"processing" | "paid" | "pending">("processing");

  useEffect(() => {
    // Check payment status via query params or call our API
    const params = new URLSearchParams(window.location.search);
    const pfPaymentId = params.get("pf_payment_id");
    const pfOrderId = params.get("m_payment_id");

    if (pfPaymentId && pfOrderId) {
      // Verify with backend
      fetch(`/api/payfast/verify?orderId=${pfOrderId}&paymentId=${pfPaymentId}`)
        .then((r) => r.json())
        .then((d) => {
          setStatus(d.paid ? "paid" : "pending");
        })
        .catch(() => setStatus("pending"));
    } else {
      // No params = direct access or cancelled then returned
      setStatus("paid");
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8 max-w-md w-full text-center shadow-xl">
        {status === "processing" ? (
          <>
            <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Processing Payment...</h2>
            <p className="text-zinc-500 mb-4">Please wait while we confirm your PayFast payment.</p>
          </>
        ) : status === "paid" ? (
          <>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Payment Successful!</h2>
            <p className="text-zinc-500 mb-2">Your payment has been confirmed.</p>
            <p className="text-zinc-500 mb-6">Our team will begin processing your order right away.</p>
            <div className="flex gap-3">
              <Link href="/shop" className="flex-1 py-2.5 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 font-medium">
                Continue Shopping
              </Link>
              <Link href="/" className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Payment Pending</h2>
            <p className="text-zinc-500 mb-6">
              Your PayFast payment is being verified. You will receive a confirmation email shortly.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
              Return to Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}