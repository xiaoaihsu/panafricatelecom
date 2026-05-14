"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Shield, AlertTriangle, Check, Loader2, Eye, EyeOff, Key
} from "lucide-react";
import { cn } from "@/lib/utils";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) { setResult({ success: false, message: "Missing reset token." }); return; }
    if (password.length < 8) { setResult({ success: false, message: "Password must be at least 8 characters." }); return; }
    if (password !== confirm) { setResult({ success: false, message: "Passwords do not match." }); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_password", token, newPassword: password }),
      });
      const data = await res.json();
      setResult(data);
      if (data.success) setTimeout(() => router.push("/admin"), 2000);
    } catch {
      setResult({ success: false, message: "Network error. Please try again." });
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8 max-w-md w-full text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Invalid Reset Link</h1>
        <p className="text-zinc-500 mb-6">This password reset link is invalid or has expired.</p>
        <a href="/admin" className="text-blue-600 hover:underline text-sm">Go to Admin Login →</a>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8 max-w-md w-full shadow-lg">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-sm">PAT</span>
        </div>
        <div>
          <h1 className="font-bold text-lg text-zinc-900 dark:text-white">Set New Password</h1>
          <p className="text-xs text-zinc-500">Pan-Africa Telecom</p>
        </div>
      </div>

      {result ? (
        <div className={cn(
          "p-4 rounded-lg text-sm font-medium mb-4",
          result.success ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
        )}>
          {result.success ? <Check className="w-4 h-4 inline mr-2" /> : <AlertTriangle className="w-4 h-4 inline mr-2" />}
          {result.message}
          {result.success && <span className="block mt-1 text-xs opacity-70">Redirecting to login...</span>}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">New Password</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Min. 8 characters"
              minLength={8}
              required
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Confirm Password</label>
          <input
            type={showPw ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Repeat password"
            minLength={8}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-zinc-400">
        <a href="/admin" className="hover:text-blue-600">← Back to login</a>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8 max-w-md w-full text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-3 text-zinc-500 text-sm">Loading...</p>
        </div>
      }>
        <ResetForm />
      </Suspense>
    </div>
  );
}