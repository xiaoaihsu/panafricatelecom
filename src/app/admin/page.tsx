"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package, ShoppingCart, TrendingUp, Plus, Edit, Trash2,
  X, Check, ArrowLeft, Save, LogOut, ChevronDown, AlertTriangle,
  User, Shield, Loader2, Eye, EyeOff, Key
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SessionUser {
  id: string;
  username: string;
  role: string;
}

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "editor";
  createdAt: string;
  lastLogin?: string;
  active: boolean;
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({
  onLogin,
  onRequestReset,
}: {
  onLogin: (username: string, password: string) => Promise<boolean>;
  onRequestReset: (email: string) => Promise<{ message: string }>;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const ok = await onLogin(username, password);
    if (!ok) { setError("Invalid username or password"); setLoading(false); }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await onRequestReset(resetEmail);
    setResetMsg(result.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">PAT</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-zinc-900 dark:text-white">Admin Login</h1>
              <p className="text-xs text-zinc-500">Pan-Africa Telecom</p>
            </div>
          </div>

          {showForgot ? (
            <>
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-lg flex items-start gap-2">
                <Key className="w-4 h-4 mt-0.5 shrink-0" />
                Enter your account email and we'll send a secure reset link.
              </div>
              {resetMsg && (
                <p className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm rounded-lg">
                  {resetMsg}
                </p>
              )}
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="andy@panafricatelecom.co.za"
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
              <button onClick={() => setShowForgot(false)} className="mt-4 w-full text-center text-sm text-zinc-500 hover:text-zinc-700">
                ← Back to login
              </button>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="admin"
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 pr-10"
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> {error}</p>}
                <button type="submit" disabled={loading} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50">
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
              <button onClick={() => setShowForgot(true)} className="mt-4 w-full text-center text-sm text-blue-600 hover:underline">
                Forgot password?
              </button>
            </>
          )}
        </div>
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to website</Link>
        </div>
      </div>
    </div>
  );
}

// ─── Product Modal ───────────────────────────────────────────────────────────

function ProductModal({
  product,
  onClose,
  onSave,
}: {
  product: Partial<Product> | null;
  onClose: () => void;
  onSave: (product: Partial<Product>) => Promise<void>;
}) {
  const [form, setForm] = useState<Partial<Product>>(
    product || { name: "", price: 0, description: "", longDescription: "", category: "connectivity", image: "", stock: 0, features: [] }
  );
  const [featureInput, setFeatureInput] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSaveFeature = () => {
    if (featureInput.trim()) {
      setForm((f) => ({ ...f, features: [...(f.features || []), featureInput.trim()] }));
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setForm((f) => ({ ...f, features: (f.features || []).filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const categories = [
    { value: "connectivity", label: "Connectivity" },
    { value: "equipment", label: "Equipment" },
    { value: "cctv", label: "CCTV" },
    { value: "renewable", label: "Solar & Renewable" },
    { value: "voip", label: "VoIP" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {product?.id ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Product Name *</label>
            <input type="text" required value={form.name || ""} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Price (ZAR) *</label>
              <input type="number" required min="0" value={form.price || ""} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Stock Quantity *</label>
              <input type="number" required min="0" value={form.stock || ""} onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Category *</label>
            <select value={form.category || "connectivity"} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Product["category"] }))}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Image URL</label>
            <input type="url" value={form.image || ""} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="https://images.unsplash.com/..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Short Description *</label>
            <input type="text" required value={form.description || ""} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Long Description</label>
            <textarea rows={3} value={form.longDescription || ""} onChange={(e) => setForm((f) => ({ ...f, longDescription: e.target.value }))}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Features</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSaveFeature())}
                className="flex-1 px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. WiFi 6 support" />
              <button type="button" onClick={handleSaveFeature} className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 font-medium text-sm">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(form.features || []).map((feat, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                  {feat}
                  <button type="button" onClick={() => handleRemoveFeature(i)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 font-medium">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? "Saving..." : <><Save className="w-4 h-4" /> Save Product</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Product Modal ──────────────────────────────────────────────────────

function DeleteProductModal({ product, onClose, onConfirm }: { product: Product; onClose: () => void; onConfirm: () => Promise<void> }) {
  const [deleting, setDeleting] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Delete Product?</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6">Are you sure you want to delete <strong>"{product.name}"</strong>? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 font-medium">Cancel</button>
          <button onClick={async () => { setDeleting(true); await onConfirm(); }} disabled={deleting}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50">
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add/Edit User Modal ──────────────────────────────────────────────────────

function UserModal({
  user,
  onClose,
  onSave,
}: {
  user: AdminUser | null;
  onClose: () => void;
  onSave: (data: { username: string; email: string; password: string; role: "admin" | "editor" }) => Promise<void>;
}) {
  const [form, setForm] = useState({ username: user?.username || "", email: user?.email || "", password: "", role: (user?.role || "editor") as "admin" | "editor" });
  const [saving, setSaving] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user && !form.password) return;
    if (user && form.password && form.password.length < 8) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{user ? "Edit User" : "Add New User"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg"><X className="w-5 h-5 text-zinc-500" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Username *</label>
            <input type="text" required value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email *</label>
            <input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              {user ? "New Password (leave blank to keep current)" : "Password *"}
            </label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder={user ? "Leave blank to keep" : "Min. 8 characters"}
                minLength={user ? 0 : 8}
                required={!user} />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Role</label>
            <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as "admin" | "editor" }))}
              className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500">
              <option value="editor">Editor — Can manage products & orders</option>
              <option value="admin">Admin — Full access including user management</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 font-medium">Cancel</button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? "Saving..." : <><Save className="w-4 h-4" /> {user ? "Update User" : "Add User"}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete User Modal ────────────────────────────────────────────────────────

function DeleteUserModal({ user, onClose, onConfirm }: { user: AdminUser; onClose: () => void; onConfirm: () => Promise<void> }) {
  const [deleting, setDeleting] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Delete User?</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6">
          Are you sure you want to delete <strong>"{user.username}"</strong> ({user.email})? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 font-medium">Cancel</button>
          <button onClick={async () => { setDeleting(true); await onConfirm(); }} disabled={deleting}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50">
            {deleting ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "users">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);

  // Check session on mount
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => {
        setIsAuthenticated(d.authenticated === true);
        setSessionUser(d.user || null);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", username, password }),
    });
    const data = await res.json();
    if (data.success) {
      setSessionUser(data.user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleRequestReset = async (email: string): Promise<{ message: string }> => {
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "request_reset", email }),
    });
    return res.json();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) });
    setIsAuthenticated(false);
    setSessionUser(null);
    router.push("/admin");
  };

  // ── Fetch Data ──────────────────────────────────────────────────────────────

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products/manage");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "list_users" }),
      });
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      if (sessionUser?.role === "admin") fetchUsers();
    }
  }, [isAuthenticated, sessionUser, fetchProducts, fetchUsers]);

  // ── Product Actions ─────────────────────────────────────────────────────────

  const handleSaveProduct = async (form: Partial<Product>) => {
    const isNew = !editingProduct?.id;
    const url = isNew ? "/api/products/create" : "/api/products/manage";
    const method = isNew ? "POST" : "PUT";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { await fetchProducts(); setShowProductModal(false); setEditingProduct(null); }
    else alert("Failed to save product.");
  };

  const handleDeleteProduct = async () => {
    if (!deleteProduct) return;
    const res = await fetch(`/api/products/manage?id=${deleteProduct.id}`, { method: "DELETE" });
    if (res.ok) { await fetchProducts(); setDeleteProduct(null); }
    else alert("Failed to delete product.");
  };

  // ── User Actions ────────────────────────────────────────────────────────────

  const handleSaveUser = async (form: { username: string; email: string; password: string; role: "admin" | "editor" }) => {
    if (editingUser) {
      // Update existing user
      const body: any = { action: "update_user", userId: editingUser.id, username: form.username, email: form.email, role: form.role };
      if (form.password) {
        // Password change handled separately
        const pwRes = await fetch("/api/admin/auth", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "change_password", userId: editingUser.id, newPassword: form.password }),
        });
        if (!pwRes.ok) { alert("Failed to update password."); return; }
      }
      const res = await fetch("/api/admin/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (data.success) { await fetchUsers(); setShowUserModal(false); setEditingUser(null); }
      else alert(data.error || "Failed to update user.");
    } else {
      // Create new user
      const res = await fetch("/api/admin/auth", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create_user", username: form.username, email: form.email, password: form.password, role: form.role }),
      });
      const data = await res.json();
      if (data.success) { await fetchUsers(); setShowUserModal(false); setEditingUser(null); }
      else alert(data.error || "Failed to create user.");
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUser) return;
    const res = await fetch("/api/admin/auth", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete_user", userId: deleteUser.id }),
    });
    const data = await res.json();
    if (data.success) { await fetchUsers(); setDeleteUser(null); }
    else alert(data.error || "Failed to delete user.");
  };

  const handleToggleUserActive = async (user: AdminUser) => {
    const res = await fetch("/api/admin/auth", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update_user", userId: user.id, active: !user.active }),
    });
    const data = await res.json();
    if (data.success) await fetchUsers();
    else alert(data.error || "Failed to update user.");
  };

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} onRequestReset={handleRequestReset} />;
  }

  const isAdmin = sessionUser?.role === "admin";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PAT</span>
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-white">Admin Panel</span>
            </Link>
            <span className="text-sm text-zinc-500">|</span>
            <span className="text-sm text-zinc-500">Pan-Africa Telecom</span>
            {sessionUser && (
              <>
                <span className="text-sm text-zinc-500">|</span>
                <span className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
                  <User className="w-4 h-4" /> {sessionUser.username}
                  {isAdmin && <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">admin</span>}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> View Website
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-red-500 transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: "products", label: "Products", icon: Package },
              { id: "orders", label: "Orders", icon: ShoppingCart },
              ...(isAdmin ? [{ id: "users", label: "Users", icon: Shield }] : []),
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Products Tab ─────────────────────────────────────────────────── */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-500 text-sm">Total Products</span>
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-zinc-900 dark:text-white">{products.length}</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-500 text-sm">Total Stock Value</span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-zinc-900 dark:text-white">R{products.reduce((sum, p) => sum + p.price * p.stock, 0).toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-500 text-sm">Low Stock Items</span>
                  <ShoppingCart className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-zinc-900 dark:text-white">{products.filter((p) => p.stock <= 5).length}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                <h2 className="font-semibold text-zinc-900 dark:text-white">Product Inventory</h2>
                <button onClick={() => { setEditingProduct(null); setShowProductModal(true); }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
              {loading ? <div className="p-8 text-center text-zinc-500">Loading products...</div>
               : products.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-zinc-500 mb-4">No products yet. Add your first product!</p>
                  <button onClick={() => { setEditingProduct(null); setShowProductModal(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">+ Add Product</button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-zinc-50 dark:bg-zinc-700/50">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">Product</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">Category</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">Price</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">Stock</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">Status</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/30">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={product.image} alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover bg-zinc-100 dark:bg-zinc-700"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                              <div>
                                <p className="font-medium text-zinc-900 dark:text-white">{product.name}</p>
                                <p className="text-xs text-zinc-500 line-clamp-1">{product.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded capitalize">{product.category}</span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white">R{product.price.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={cn("text-sm font-medium", product.stock > 10 ? "text-green-600" : product.stock > 5 ? "text-yellow-600" : "text-red-600")}>
                              {product.stock} units
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn("px-2 py-1 text-xs font-medium rounded-full", product.stock > 5 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400")}>
                              {product.stock > 5 ? "In Stock" : "Low Stock"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <button onClick={() => { setEditingProduct(product); setShowProductModal(true); }}
                                className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg" title="Edit"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => setDeleteProduct(product)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" title="Delete"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Orders Tab ───────────────────────────────────────────────────── */}
        {activeTab === "orders" && (
          <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
              <h2 className="font-semibold text-zinc-900 dark:text-white">Recent Orders</h2>
              <p className="text-sm text-zinc-500 mt-1">Orders are sent to sales@panafricatelecom.co.za via email</p>
            </div>
            <div className="p-12 text-center">
              <p className="text-zinc-500 mb-2">Order management coming soon</p>
              <p className="text-sm text-zinc-400">Orders placed through the shop will appear here.</p>
            </div>
          </div>
        )}

        {/* ── Users Tab (Admin Only) ───────────────────────────────────────── */}
        {activeTab === "users" && isAdmin && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-500 text-sm">Total Users</span>
                  <User className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-zinc-900 dark:text-white">{users.length}</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-500 text-sm">Admins</span>
                  <Shield className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-3xl font-bold text-zinc-900 dark:text-white">{users.filter(u => u.role === "admin").length}</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-500 text-sm">Active Users</span>
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-zinc-900 dark:text-white">{users.filter(u => u.active).length}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                <h2 className="font-semibold text-zinc-900 dark:text-white">User Management</h2>
                <button onClick={() => { setEditingUser(null); setShowUserModal(true); }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg">
                  <Plus className="w-4 h-4" /> Add User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-50 dark:bg-zinc-700/50">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">User</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">Email</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">Role</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">Last Login</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/30">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-medium text-zinc-900 dark:text-white">{user.username}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={cn("px-2 py-1 text-xs font-medium rounded-full",
                            user.role === "admin" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300")}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleToggleUserActive(user)}
                            className={cn("px-2 py-1 text-xs font-medium rounded-full transition-colors",
                              user.active
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-red-100 hover:text-red-700"
                                : "bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400 hover:bg-green-100 hover:text-green-700")}>
                            {user.active ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-500">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleString("en-ZA", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "Never"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <button onClick={() => { setEditingUser(user); setShowUserModal(true); }}
                              className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg" title="Edit"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => setDeleteUser(user)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" title="Delete"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showProductModal && (
        <ProductModal product={editingProduct} onClose={() => { setShowProductModal(false); setEditingProduct(null); }} onSave={handleSaveProduct} />
      )}
      {deleteProduct && (
        <DeleteProductModal product={deleteProduct} onClose={() => setDeleteProduct(null)} onConfirm={handleDeleteProduct} />
      )}
      {showUserModal && (
        <UserModal user={editingUser} onClose={() => { setShowUserModal(false); setEditingUser(null); }} onSave={handleSaveUser} />
      )}
      {deleteUser && (
        <DeleteUserModal user={deleteUser} onClose={() => setDeleteUser(null)} onConfirm={handleDeleteUser} />
      )}
    </div>
  );
}