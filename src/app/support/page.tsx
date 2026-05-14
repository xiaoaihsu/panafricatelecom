import Link from "next/link";
import { Phone, Mail, MessageSquare, Clock, Headphones, RefreshCw, Shield, FileText, Video } from "lucide-react";

const supportOptions = [
  {
    icon: MessageSquare,
    title: "WhatsApp Support",
    desc: "Instant messaging support via WhatsApp. Fast response during business hours.",
    action: "Chat on WhatsApp",
    href: "https://wa.me/27871525695",
    badge: "Fastest",
  },
  {
    icon: Phone,
    title: "Phone Support",
    desc: "Speak to our technical support team. Available Mon-Fri 8am-5pm, Sat 9am-1pm.",
    action: "Call 034-0085055",
    href: "tel:0340085055",
    badge: "24/7 Priority",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Send us an email and we'll respond within 24 hours on business days.",
    action: "Email Us",
    href: "mailto:support@panafricatelecom.co.za",
  },
];

const faqs = [
  {
    q: "How do I check if my internet is down?",
    a: "First, check if the power light on your CPE/router is on. If it's off, check the power connection. If lights are on but no internet, try restarting your router. You can also check your customer portal for any known outages.",
  },
  {
    q: "How do I change my WiFi password?",
    a: "Log into your router's admin panel (usually 192.168.1.1 or 192.168.0.1). Navigate to Wireless settings and change the WPA/WPA2 key. Contact us if you need the default admin credentials.",
  },
  {
    q: "What should I do if my connection is slow?",
    a: "Try the following: 1) Restart your router, 2) Move closer to the router or access point, 3) Disconnect unused devices, 4) Check for interference from other electronics. If the issue persists, contact our support team.",
  },
  {
    q: "How do I port my number to Pan Africa Telecom?",
    a: "Contact us via WhatsApp or phone with your current number and account details. We'll initiate the porting process which typically takes 3-5 business days. Your service should not be interrupted during the port.",
  },
  {
    q: "What is the installation process?",
    a: "For new installations, we'll schedule a technician visit. They will install the CPE/router, align the antenna for optimal signal, and test your connection. Installation typically takes 2-3 hours.",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Headphones className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Technical Support</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Need help? Our technical support team is here to assist you. Choose your preferred support channel below.
          </p>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">How can we help?</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Select a support channel that works best for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {supportOptions.map((option) => (
              <a
                key={option.title}
                href={option.href}
                target={option.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
              >
                {option.badge && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded mb-3">
                    {option.badge}
                  </span>
                )}
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <option.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-2">{option.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">{option.desc}</p>
                <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
                  {option.action} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-12 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Support Hours</h3>
                  <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">08:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">09:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium text-red-500">Closed</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 mt-3">Emergency outages are handled 24/7 via our emergency line.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Before Contacting Support</h3>
                  <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                    <li>• Check your customer portal for known outages</li>
                    <li>• Restart your router/CPE device</li>
                    <li>• Check all cable connections</li>
                    <li>• Note any error messages on the device</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Quick answers to common questions</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-medium text-zinc-900 dark:text-white">{faq.q}</span>
                  <div className="w-5 h-5 border border-zinc-300 dark:border-zinc-600 rounded flex items-center justify-center group-open:rotate-180 transition-transform">
                    <svg className="w-3 h-3 text-zinc-500" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </summary>
                <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Link */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Manage Your Account Online</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Use our customer portal to check your data usage, pay invoices, raise support tickets, and manage your services.
          </p>
          <a
            href="https://portal.panafricatelecom.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
          >
            Open Customer Portal
          </a>
        </div>
      </section>
    </div>
  );
}