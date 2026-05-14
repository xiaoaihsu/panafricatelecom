import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/coverage", label: "Coverage" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/global-connectivity", label: "Global Connectivity" },
  { href: "/services/it-services", label: "IT Services" },
  { href: "/services/equipment", label: "Equipment Distribution" },
  { href: "/services/voip", label: "VoIP / SMS / A2P" },
  { href: "/services/cctv", label: "CCTV Installation" },
  { href: "/services/renewable", label: "Renewable Energy" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-900 dark:bg-zinc-950 text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PAT</span>
              </div>
              <span className="font-bold text-lg text-white">Pan Africa Telecom</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Providing courteous and reliable internet services. Connecting unserved & underserved communities in Africa.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.facebook.com/PanAfricaTelecom/" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 rounded-lg hover:bg-blue-600 transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://za.linkedin.com/company/panafricatelecom" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 rounded-lg hover:bg-blue-600 transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@PanAfricaTelecom" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 rounded-lg hover:bg-blue-600 transition-colors">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                <span>26 Marconi Drive, Riverside Industrial, Newcastle, 2940, South Africa</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-blue-500" />
                <a href="tel:0340085055" className="hover:text-blue-400">034-0085055</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-blue-500" />
                <a href="https://wa.me/27871525695" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  WhatsApp: 0871525695
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-blue-500" />
                <a href="mailto:info@PanAfricaTelecom.co.za" className="hover:text-blue-400">info@PanAfricaTelecom.co.za</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Pan Africa Telecom (Pty) Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <a href="#" className="hover:text-blue-400">Terms & Conditions</a>
              <a href="#" className="hover:text-blue-400">Privacy Policy</a>
              <span>ICASA Licensed: 2411/CECNS/CECS/FEB/2023</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}