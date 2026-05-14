"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/coverage", label: "Coverage" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Pan Africa Telecom" className="h-10 w-auto" />
            <span className="font-bold text-lg text-zinc-900 dark:text-white hidden sm:block">
              Pan Africa Telecom
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-zinc-700 dark:text-zinc-300"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href="tel:0340085055"
              className="hidden sm:flex items-center gap-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">034-0085055</span>
            </a>
            <a
              href="https://portal.panafricatelecom.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Portal</span>
            </a>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-700">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2 px-3">
                <a
                  href="tel:0340085055"
                  className="flex items-center gap-1.5 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  <Phone className="w-4 h-4" />
                  034-0085055
                </a>
                <a
                  href="https://portal.panafricatelecom.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg"
                >
                  Customer Portal
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}