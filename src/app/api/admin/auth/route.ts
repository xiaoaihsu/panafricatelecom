import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, getSession, createUser, listUsers, updateUser, deleteUser, updateUserPassword } from "@/lib/users";
import { sendPasswordResetEmail } from "@/lib/email";

// GET — Check session
export async function GET() {
  const session = await getSession();
  return NextResponse.json({
    authenticated: !!session,
    user: session ? { id: session.userId, username: session.username, role: session.role } : null
  });
}

// POST — Login or create session
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, username, password, email } = body;

    // ── Login ──────────────────────────────────────────
    if (action === "login" || (!action && username && password)) {
      const user = await validateCredentials(username, password);
      if (!user) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
      }

      const { signToken } = await import("@/lib/users");
      const token = signToken({ userId: user.id, username: user.username, role: user.role });

      const response = NextResponse.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
      response.cookies.set("pat_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });
      return response;
    }

    // ── Logout ─────────────────────────────────────────
    if (action === "logout") {
      const response = NextResponse.json({ success: true });
      response.cookies.set("pat_session", "", { httpOnly: true, maxAge: 0, path: "/" });
      return response;
    }

    // ── Request password reset ─────────────────────────
    if (action === "request_reset") {
      if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });
      const { requestPasswordReset } = await import("@/lib/users");
      const result = await requestPasswordReset(email);
      return NextResponse.json(result);
    }

    // ── Create user (admin only) ───────────────────────
    if (action === "create_user") {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      if (session.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403 });

      const { username: u, email: e, password: p, role } = body;
      if (!u || !e || !p) return NextResponse.json({ error: "Username, email and password are required" }, { status: 400 });

      try {
        const user = await createUser({ username: u, email: e, password: p, role: role || "editor" });
        return NextResponse.json({ success: true, user: { id: user.id, username: user.username, email: user.email, role: user.role, createdAt: user.createdAt, active: user.active } });
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    }

    // ── List users (admin only) ─────────────────────────
    if (action === "list_users") {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      if (session.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403 });

      const users = await listUsers();
      return NextResponse.json({ success: true, users });
    }

    // ── Update user (admin only) ────────────────────────
    if (action === "update_user") {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      if (session.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403 });

      const { userId, username, email, role, active } = body;
      if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

      try {
        const updated = await updateUser(userId, { username, email, role, active });
        return NextResponse.json({ success: true, user: { id: updated.id, username: updated.username, email: updated.email, role: updated.role, createdAt: updated.createdAt, lastLogin: updated.lastLogin, active: updated.active } });
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    }

    // ── Delete user (admin only) ────────────────────────
    if (action === "delete_user") {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      if (session.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403 });

      const { userId } = body;
      if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

      try {
        await deleteUser(userId);
        return NextResponse.json({ success: true });
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    }

    // ── Reset password (with token) ────────────────────
    if (action === "reset_password") {
      const { token, newPassword } = body;
      if (!token || !newPassword) return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
      if (newPassword.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });

      const { resetPassword } = await import("@/lib/users");
      const result = await resetPassword(token, newPassword);
      return NextResponse.json(result);
    }

    // ── Change user password (admin only) ────────────
    if (action === "change_password") {
      const session = await getSession();
      if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      if (session.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403 });

      const { userId, newPassword } = body;
      if (!userId || !newPassword) return NextResponse.json({ error: "User ID and new password are required" }, { status: 400 });
      if (newPassword.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });

      try {
        await updateUserPassword(userId, newPassword);
        return NextResponse.json({ success: true });
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("Auth API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}