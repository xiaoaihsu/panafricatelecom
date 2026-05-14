import Link from "next/link";
import { Globe, Monitor, Package, Phone, Shield, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";

const services = [
  {
    icon: Globe,
    title: "Global Connectivity",
    description: "MPLS VPN, SDWAN, and IEPL solutions for enterprise connectivity across Africa and globally.",
    href: "/services/global-connectivity",
  },
  {
    icon: Monitor,
    title: "IT Services",
    description: "Professional IT support, network design, and managed services for businesses of all sizes.",
    href: "/services/it-services",
  },
  {
    icon: Package,
    title: "Equipment Distribution",
    description: "Enterprise, ISP, and telecommunications equipment distribution across Sub-Saharan Africa.",
    href: "/services/equipment",
  },
  {
    icon: Phone,
    title: "VoIP / SMS / A2P",
    description: "Cost-effective voice services with number portability and SMS/A2P messaging solutions.",
    href: "/services/voip",
  },
  {
    icon: Shield,
    title: "CCTV Installation",
    description: "Professional CCTV supply and installation for homes and businesses. Remote monitoring.",
    href: "/services/cctv",
  },
  {
    icon: Zap,
    title: "Renewable Energy",
    description: "Solar panel and inverter installation for off-grid and backup power solutions.",
    href: "/services/renewable",
  },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Active Clients" },
  { value: "99.9%", label: "Uptime" },
  { value: "N-S", label: "Support" },
];

const whyChooseUs = [
  "ICASA Licensed Telecommunications Provider",
  "Experienced engineers and technical staff",
  "Enterprise-grade infrastructure",
  "Technical support available",
  "Number portability available",
  "Nationwide coverage",
];

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Stats */}
      <section className="bg-blue-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Comprehensive ICT solutions for homes and businesses across South Africa and beyond.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 border border-zinc-200 dark:border-zinc-700"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About / Mission */}
      <section className="py-16 md:py-20 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2 uppercase tracking-wide text-sm">
                About Pan Africa Telecom
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">
                Connect unserved & underserved digital experiences
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                We collaborate with smart and creative people to build awesome internet service provider to connect unserved & underserved in Africa to the Internet. Our mission is to bridge the digital divide by providing reliable, affordable connectivity solutions.
              </p>
              <ul className="space-y-3">
                {whyChooseUs.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <div className="space-y-4">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-blue-200 text-sm mb-1">ICASA Licensed</p>
                <p className="font-medium">License No: 2411/CECNS/CECS/FEB/2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Ready to get connected?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            Contact us today to discuss your connectivity needs. Our team is ready to help you get online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="https://portal.panafricatelecom.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Customer Portal
            </a>
          </div>
        </div>
      </section>

      {/* Shop Promo */}
      <section className="py-16 bg-zinc-900 dark:bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-blue-400 font-medium mb-2">Telecom Equipment Shop</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Hardware & Gadgets
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Browse our range of routers, access points, cameras, solar equipment, and more. All products include installation support and warranty.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 font-medium rounded-lg transition-colors"
              >
                Browse Shop <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "5G CPE Router", price: "R2,499", img: "https://ueeshop.ly200-cdn.com/u_file/UPAY/UPAY581/2512/16/products/4-114113ff70.jpg?x-oss-process=image/format,webp/quality,q_100/resize,m_lfit,h_1000,w_1000" },
                { name: "WiFi 6 AP", price: "R1,299", img: "https://ueeshop.ly200-cdn.com/u_file/UPAY/UPAY581/2512/16/products/4-114113ff70.jpg?x-oss-process=image/format,webp/quality,q_100/resize,m_lfit,h_1000,w_1000" },
                { name: "4MP IP Camera", price: "R899", img: "https://ueeshop.ly200-cdn.com/u_file/UPAY/UPAY581/2512/16/products/4-114113ff70.jpg?x-oss-process=image/format,webp/quality,q_100/resize,m_lfit,h_1000,w_1000" },
                { name: "400W Solar Panel", price: "R4,299", img: "https://ueeshop.ly200-cdn.com/u_file/UPAY/UPAY581/2512/16/products/4-114113ff70.jpg?x-oss-process=image/format,webp/quality,q_100/resize,m_lfit,h_1000,w_1000" },
              ].map((item) => (
                <div key={item.name} className="bg-zinc-800 rounded-xl overflow-hidden text-center">
                  <div className="aspect-square bg-zinc-700 relative">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-blue-400 font-bold text-sm">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}