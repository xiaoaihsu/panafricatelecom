import Link from "next/link";
import { CheckCircle2, Users, Globe, Award, MapPin, Phone, Mail } from "lucide-react";

const team = [
  { name: "Managing Director", role: "Leadership" },
  { name: "Technical Director", role: "Engineering" },
  { name: "Sales Manager", role: "Business Development" },
  { name: "Support Lead", role: "Customer Success" },
];

const milestones = [
  { year: "2014", event: "Company founded in Newcastle, South Africa" },
  { year: "2016", event: "ICASA telecommunications license obtained" },
  { year: "2018", event: "Expanded to national ISP operations" },
  { year: "2020", event: "Launched VoIP and SMS services" },
  { year: "2022", event: "Equipment distribution division launched" },
  { year: "2024", event: "Solar and renewable energy solutions added" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Pan Africa Telecom</h1>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto">
            Connecting unserved and underserved communities to the digital world through reliable, affordable internet and ICT services.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2 uppercase tracking-wide text-sm">Our Mission</p>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">
                Connect unserved & underserved digital experiences
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                We collaborate with smart and creative people to build awesome internet service provider to connect unserved & underserved in Africa to the Internet. Our vision is to bridge the digital divide by providing reliable, affordable connectivity solutions that empower communities and businesses alike.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                As an ICASA licensed telecommunications provider, we adhere to the highest standards of service quality and regulatory compliance. Our team of experienced engineers and support staff is committed to delivering courteous, professional service to every customer.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "10+", label: "Years Experience" },
                  { value: "500+", label: "Active Clients" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "24/7", label: "Support" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                    <div className="text-sm text-zinc-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Why Choose Pan Africa Telecom?</h3>
              <div className="space-y-4">
                {[
                  "ICASA Licensed Telecommunications Provider",
                  "Experienced engineers and technical staff",
                  "Enterprise-grade infrastructure",
                  "24/7 technical support available",
                  "Number portability for VoIP services",
                  "Nationwide coverage and connectivity",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-20 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">What We Do</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              We offer a comprehensive range of ICT services to meet the connectivity and technology needs of our customers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Global Connectivity",
                description: "MPLS VPN, SDWAN, and IEPL solutions for enterprise connectivity across Africa and globally.",
              },
              {
                icon: Users,
                title: "IT Services",
                description: "Professional IT support, network design, and managed services for businesses of all sizes.",
              },
              {
                icon: Globe,
                title: "Fixed Wireless Internet",
                description: "High-speed broadband for homes and businesses in unserved and underserved areas.",
              },
              {
                icon: Phone,
                title: "VoIP Solutions",
                description: "Cost-effective voice services with number portability and unlimited calling plans.",
              },
              {
                icon: Award,
                title: "Equipment Distribution",
                description: "Enterprise, ISP, and telecommunications equipment distribution across Sub-Saharan Africa.",
              },
              {
                icon: Globe,
                title: "CCTV & Renewable",
                description: "Professional CCTV installation and solar/renewable energy solutions for homes and businesses.",
              },
            ].map((service) => (
              <div key={service.title} className="bg-white dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Our Journey</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6 pb-8">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mt-2" />
                  {index < milestones.length - 1 && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-full bg-zinc-200 dark:bg-zinc-700" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-zinc-700 dark:text-zinc-300">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-zinc-900 dark:bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to work together?</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your connectivity and ICT needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 font-medium rounded-lg"
            >
              Contact Us
            </Link>
            <a href="tel:0340085055" className="flex items-center gap-2 px-8 py-3 border border-zinc-700 font-medium rounded-lg hover:bg-zinc-800">
              <Phone className="w-4 h-4" />
              034-0085055
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-zinc-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Newcastle, South Africa
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              info@PanAfricaTelecom.co.za
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}