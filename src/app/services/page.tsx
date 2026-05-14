import Link from "next/link";
import { Globe, Monitor, Package, Phone, Shield, Zap, CheckCircle2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    slug: "global-connectivity",
    title: "Global Connectivity",
    subtitle: "MPLS VPN / SDWAN / IEPL",
    description: "Enterprise-grade connectivity solutions connecting your business across Africa and globally. Our network infrastructure delivers reliable, low-latency connections for mission-critical applications.",
    features: [
      "MPLS VPN for site-to-site connectivity",
      "SDWAN for intelligent traffic routing",
      "IEPL for dedicated ethernet services",
      "BGP peering and transit services",
      "24/7 network monitoring",
    ],
    cta: "Explore Connectivity Solutions",
    ctaLink: "/services/global-connectivity",
  },
  {
    icon: Monitor,
    slug: "it-services",
    title: "IT Services",
    subtitle: "Managed IT & Technical Support",
    description: "Professional IT support and managed services for businesses of all sizes. Our experienced team provides proactive monitoring, maintenance, and rapid response to keep your systems running.",
    features: [
      "Network design and implementation",
      "24/7 technical support",
      "Server and infrastructure management",
      "Cloud migration services",
      "Cybersecurity solutions",
    ],
    cta: "View IT Services",
    ctaLink: "/services/it-services",
  },
  {
    icon: Package,
    slug: "equipment",
    title: "Equipment Distribution",
    subtitle: "Enterprise & ISP Hardware",
    description: "Leveraging our affiliate resources, we distribute equipment and materials to Enterprises, ISPs, and Telecommunications providers across Sub-Saharan Africa. All equipment comes with technical support.",
    features: [
      "5G/LTE routers and CPEs",
      "WiFi access points and controllers",
      "Switches and routers",
      "Fiber optic equipment",
      "Power solutions (UPS, PoE)",
    ],
    cta: "View Equipment",
    ctaLink: "/shop",
  },
  {
    icon: Phone,
    slug: "voip",
    title: "VoIP / SMS / A2P",
    subtitle: "Voice & Messaging Solutions",
    description: "Cost-effective VoIP solutions for home and business. Move your existing Telkom number onto our service and save on calls. We also provide SMS and A2P messaging services for enterprises.",
    features: [
      "Number portability (Telkom to VoIP)",
      "Unlimited local calls",
      "International call rates from R0.45/min",
      "SMS gateway and A2P services",
      "Multi-IVR and call routing",
    ],
    cta: "Explore VoIP",
    ctaLink: "/services/voip",
  },
  {
    icon: Shield,
    slug: "cctv",
    title: "CCTV Installation",
    subtitle: "Surveillance & Security",
    description: "Professional CCTV supply and installation for homes and businesses. We provide end-to-end surveillance solutions with remote monitoring capabilities and cloud storage options.",
    features: [
      "4MP to 8MP IP cameras",
      "NVR with AI detection",
      "Remote viewing via mobile app",
      "Cloud and local storage options",
      "Professional installation",
    ],
    cta: "View CCTV Products",
    ctaLink: "/shop?category=cctv",
  },
  {
    icon: Zap,
    slug: "renewable",
    title: "Renewable Energy",
    subtitle: "Solar & Battery Solutions",
    description: "Solar panel and inverter installation for off-grid and backup power solutions. Perfect for areas with unreliable grid power or for businesses looking to reduce energy costs and carbon footprint.",
    features: [
      "400W to 550W solar panels",
      "Hybrid and off-grid inverters",
      "Lithium battery storage",
      "Battery backup systems",
      "Installation and maintenance",
    ],
    cta: "View Solar Products",
    ctaLink: "/shop?category=renewable",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Comprehensive ICT solutions for homes and businesses across South Africa and beyond.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, index) => (
            <div
              key={service.slug}
              id={service.slug}
              className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-medium text-sm uppercase tracking-wide">
                    {service.subtitle}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">{service.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  {service.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className={`bg-zinc-100 dark:bg-zinc-800 rounded-2xl aspect-video flex items-center justify-center ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="text-center text-zinc-400">
                  <service.icon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">{service.title} Illustration</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-800/50 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Need a custom solution?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
            Contact us to discuss your specific requirements. Our team will design a tailored solution for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}