/**
 * USER MANAGEMENT — Pan-Africa Telecom Admin
 * ============================================
 * Users are stored in data/users.json with bcrypt-hashed passwords.
 * JWT tokens are used for session management.
 * Recovery email: andy@panafricatelecom.co.za
 */

import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { sendPasswordResetEmail } from "@/lib/email";

// ─── File Paths ───────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const RESET_TOKENS_FILE = path.join(DATA_DIR, "reset-tokens.json");

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "editor";
  passwordHash: string;
  createdAt: string;
  lastLogin?: string;
  active: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readUsers(): User[] {
  ensureDataDir();
  if (!fs.existsSync(USERS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeUsers(users: User[]): void {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function readResetTokens(): Record<string, { userId: string; expires: number }> {
  ensureDataDir();
  if (!fs.existsSync(RESET_TOKENS_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(RESET_TOKENS_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeResetTokens(tokens: Record<string, { userId: string; expires: number }>): void {
  ensureDataDir();
  fs.writeFileSync(RESET_TOKENS_FILE, JSON.stringify(tokens, null, 2));
}

// ─── JWT Secret ───────────────────────────────────────────────────────────────

const JWT_SECRET = process.env.JWT_SECRET || "pat-super-secret-key-change-in-production-2024";
const COOKIE_NAME = "pat_session";

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): { userId: string; username: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; username: string; role: string };
  } catch {
    return null;
  }
}

// ─── Auth Middleware ──────────────────────────────────────────────────────────

export async function getSession(): Promise<{ userId: string; username: string; role: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// ─── User CRUD ────────────────────────────────────────────────────────────────

export async function createUser(data: {
  username: string;
  email: string;
  password: string;
  role?: "admin" | "editor";
}): Promise<User> {
  const users = readUsers();
  
  // Check username uniqueness
  if (users.find((u) => u.username.toLowerCase() === data.username.toLowerCase())) {
    throw new Error("Username already exists");
  }

  // Check email uniqueness
  if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error("Email already in use");
  }

  const passwordHash = await bcrypt.hash(data.password, 12);
  const user: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    username: data.username,
    email: data.email,
    role: data.role || "editor",
    passwordHash,
    createdAt: new Date().toISOString(),
    active: true,
  };

  users.push(user);
  writeUsers(users);
  return user;
}

export async function validateCredentials(username: string, password: string): Promise<User | null> {
  const users = readUsers();
  const user = users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.active
  );
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  // Update last login
  user.lastLogin = new Date().toISOString();
  writeUsers(users);
  return user;
}

export async function updateUser(userId: string, updates: Partial<Pick<User, "username" | "email" | "role" | "active">>): Promise<User> {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error("User not found");

  // Check username uniqueness if changing
  if (updates.username && updates.username.toLowerCase() !== users[idx].username.toLowerCase()) {
    if (users.find((u) => u.username.toLowerCase() === updates.username!.toLowerCase() && u.id !== userId)) {
      throw new Error("Username already exists");
    }
  }

  // Check email uniqueness if changing
  if (updates.email && updates.email.toLowerCase() !== users[idx].email.toLowerCase()) {
    if (users.find((u) => u.email.toLowerCase() === updates.email!.toLowerCase() && u.id !== userId)) {
      throw new Error("Email already in use");
    }
  }

  users[idx] = { ...users[idx], ...updates };
  writeUsers(users);
  return users[idx];
}

export async function updateUserPassword(userId: string, newPassword: string): Promise<void> {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error("User not found");

  users[idx].passwordHash = await bcrypt.hash(newPassword, 12);
  writeUsers(users);
}

export async function deleteUser(userId: string): Promise<void> {
  const users = readUsers();
  const filtered = users.filter((u) => u.id !== userId);
  if (filtered.length === users.length) throw new Error("User not found");
  
  // Prevent deleting last admin
  if (!filtered.some((u) => u.role === "admin")) {
    throw new Error("Cannot delete the last admin user");
  }
  
  writeUsers(filtered);
}

export async function listUsers(): Promise<Omit<User, "passwordHash">[]> {
  const users = readUsers();
  return users.map(({ passwordHash, ...rest }) => rest);
}

export async function getUserById(userId: string): Promise<User | null> {
  const users = readUsers();
  return users.find((u) => u.id === userId) || null;
}

// ─── Password Reset ───────────────────────────────────────────────────────────

export async function requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    // Don't reveal whether email exists
    return { success: true, message: "If that email is registered, a reset link has been sent." };
  }

  // Generate reset token
  const token = crypto.randomUUID();
  const tokens = readResetTokens();
  tokens[token] = { userId: user.id, expires: Date.now() + 60 * 60 * 1000 }; // 1 hour expiry
  writeResetTokens(tokens);

  // Send email
const resetUrl = `https://panafricatelecom.co.za/admin/reset?token=${token}`;
  await sendPasswordResetEmail({
    to: user.email,
    username: user.username,
    resetUrl,
  });

  return { success: true, message: "If that email is registered, a reset link has been sent." };
}

export async function resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  const tokens = readResetTokens();
  const tokenData = tokens[token];

  if (!tokenData) {
    return { success: false, message: "Invalid or expired reset token." };
  }

  if (Date.now() > tokenData.expires) {
    delete tokens[token];
    writeResetTokens(tokens);
    return { success: false, message: "Reset token has expired. Please request a new one." };
  }

  await updateUserPassword(tokenData.userId, newPassword);
  delete tokens[token];
  writeResetTokens(tokens);

  return { success: true, message: "Password has been reset successfully." };
}
