"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Building, CheckCircle, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { state, dispatch, cartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"payfast" | "eft">("payfast");
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "details" | "confirm" | "success">("cart");
  const [orderId, setOrderId] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = () => {
    if (checkoutStep === "cart") {
      setCheckoutStep("details");
    } else if (checkoutStep === "details") {
      setCheckoutStep("confirm");
    }
  };

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);

    const items = state.items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          total: cartTotal,
          customer: formData,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // For PayFast card payments, redirect directly to PayFast
        if (paymentMethod === "payfast" && data.payfastUrl) {
          dispatch({ type: "CLEAR_CART" });
          window.location.href = data.payfastUrl;
          return;
        }

        // For EFT, show success with bank details
        setOrderId(data.orderId);
        dispatch({ type: "CLEAR_CART" });
        setCheckoutStep("success");
      } else {
        alert(data.message || "Failed to place order. Please try again.");
      }
    } catch {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (state.items.length === 0 && checkoutStep !== "success") {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">Add some products to get started!</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
            Browse Shop
          </Link>
        </div>
      </div>
    );
  }

  if (checkoutStep === "success") {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Order Placed!</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">
            Your order has been received and our sales team will contact you shortly.
          </p>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-6">
            Order ID: {orderId}
          </p>
          <div className="space-y-3">
            {paymentMethod === "eft" ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-left">
                <p className="font-medium text-zinc-900 dark:text-white mb-2">Bank Transfer Details</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Bank: ABSA Bank</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Branch: 635001</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Account Holder: Pan Africa Telecom (Pty) Ltd</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Account: 4104385087</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Reference: <strong>{orderId}</strong></p>
              </div>
            ) : (
              <p className="text-sm text-zinc-500">A PayFast payment link will be sent to <strong>{formData.email}</strong></p>
            )}
          </div>
          <div className="flex gap-3 mt-6">
            <Link href="/shop" className="flex-1 py-2.5 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 font-medium">
              Continue Shopping
            </Link>
            <Link href="/" className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <section className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {checkoutStep !== "cart" && (
                <button
                  onClick={() => setCheckoutStep(checkoutStep === "confirm" ? "details" : "cart")}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {checkoutStep === "cart" ? "Shopping Cart" : checkoutStep === "details" ? "Your Details" : "Confirm Order"}
                </h1>
                <p className="text-sm text-zinc-500">
                  {checkoutStep === "cart" && `${state.items.reduce((s, i) => s + i.quantity, 0)} items`}
                  {checkoutStep === "details" && "Step 2 of 3"}
                  {checkoutStep === "confirm" && "Step 3 of 3"}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              {["cart", "details", "confirm"].map((step, i) => (
                <div key={step} className="flex items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      checkoutStep === step
                        ? "bg-blue-600 text-white"
                        : ["cart", "details", "confirm"].indexOf(checkoutStep) > i
                        ? "bg-green-500 text-white"
                        : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500"
                    )}
                  >
                    {["cart", "details", "confirm"].indexOf(checkoutStep) > i ? "✓" : i + 1}
                  </div>
                  {i < 2 && <div className="w-8 h-0.5 bg-zinc-200 dark:bg-zinc-700" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {checkoutStep === "cart" && (
          <div className="space-y-4">
            {state.items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 flex gap-4"
              >
                <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">{item.product.name}</h3>
                    <p className="text-sm text-zinc-500">R{item.product.price.toLocaleString()} each</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            productId: item.product.id,
                            quantity: item.quantity - 1,
                          })
                        }
                        className="p-1 border border-zinc-300 dark:border-zinc-600 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            productId: item.product.id,
                            quantity: item.quantity + 1,
                          })
                        }
                        className="p-1 border border-zinc-300 dark:border-zinc-600 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        R{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => dispatch({ type: "REMOVE_ITEM", productId: item.product.id })}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-600 dark:text-zinc-400">Subtotal (excl. VAT)</span>
                <span className="font-medium">R{(cartTotal / 1.15).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-600 dark:text-zinc-400">VAT (15%)</span>
                <span className="font-medium">R{(cartTotal - cartTotal / 1.15).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between mb-6 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                <span className="text-lg font-bold text-zinc-900 dark:text-white">Total (incl. VAT)</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  R{cartTotal.toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {checkoutStep === "details" && (
          <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Delivery Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="082 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Johannesburg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Delivery Address *</label>
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="123 Main Street, Johannesburg, Gauteng"
                />
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={!formData.name || !formData.email || !formData.phone || !formData.city || !formData.postalCode || !formData.address}
              className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {checkoutStep === "confirm" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium">R{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-lg font-bold">Total (incl. VAT)</span>
                  <p className="text-xs text-zinc-500">incl. 15% VAT</p>
                </div>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  R{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Delivery To</h2>
              <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <p className="font-medium text-zinc-900 dark:text-white">{formData.name}</p>
                <p>{formData.address}</p>
                <p>
                  {formData.city}, {formData.postalCode}
                </p>
                <p>
                  {formData.email} | {formData.phone}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Payment Method</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("payfast")}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-colors",
                    paymentMethod === "payfast"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                  )}
                >
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-zinc-900 dark:text-white">PayFast</p>
                    <p className="text-sm text-zinc-500">Pay securely with card, EFT, or SnapScan</p>
                  </div>
                  {paymentMethod === "payfast" && (
                    <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </button>
                <button
                  onClick={() => setPaymentMethod("eft")}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-colors",
                    paymentMethod === "eft"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
                  )}
                >
                  <Building className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-zinc-900 dark:text-white">EFT / Direct Transfer</p>
                    <p className="text-sm text-zinc-500">
                      ABSA Bank | Acc: 4104385087 | Use order number as reference
                    </p>
                  </div>
                  {paymentMethod === "eft" && (
                    <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 text-center">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                By placing this order you agree to our Terms &amp; Conditions and Privacy Policy.
              </p>
              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {placingOrder ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing Order...
                  </>
                ) : paymentMethod === "payfast" ? (
                  "Pay with PayFast"
                ) : (
                  "Place Order (EFT)"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}