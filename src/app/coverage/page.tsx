import Link from "next/link";
import { MapPin, CheckCircle2 } from "lucide-react";

const coverageAreas = [
  { region: "KwaZulu-Natal", areas: ["Ballito", "Salt Rock", "Shaka's Head", "Umhlali", "Blythedale Beach"] },
  { region: "Gauteng", areas: ["Johannesburg", "Pretoria", "Midrand", "Centurion"] },
  { region: "Limpopo", areas: ["Polokwane", "Mokopane", "Mokomo"] },
  { region: "Mpumalanga", areas: ["Nelspruit", "Witrivier", "Sabie"] },
  { region: "Free State", areas: ["Bloemfontein", "Welkom", "Bethlehem"] },
  { region: "Eastern Cape", areas: ["East London", "Port Elizabeth", "Mthatha"] },
  { region: "Western Cape", areas: ["Cape Town", "Stellenbosch", "Paarl"] },
  { region: "North West", areas: ["Rustenburg", "Klerksdorp", "Potchefstroom"] },
];

const features = [
  "Fixed Wireless Internet (5G/LTE)",
  "Business Fibre connections",
  "VoIP and cloud telephony",
  "Site-to-site VPN connectivity",
  "24/7 technical support",
  "Static IP addresses available",
];

export default function CoveragePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Coverage Areas</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            We provide internet and ICT services across South Africa. Check if we&apos;re available in your area.
          </p>
        </div>
      </section>

      {/* Coverage Map Placeholder */}
      <section className="py-12 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-8 text-center">
            <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">South Africa Coverage</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              We provide services nationwide through our partner network and wireless infrastructure.
            </p>
            <div className="bg-zinc-100 dark:bg-zinc-700 rounded-xl aspect-video flex items-center justify-center">
              <p className="text-zinc-400">Interactive coverage map coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Service Areas by Region</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Contact us to check availability in your specific location.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageAreas.map((region) => (
              <div key={region.region} className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">{region.region}</h3>
                <ul className="space-y-2">
                  {region.areas.map((area) => (
                    <li key={area} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Connection Types</h2>
              <div className="space-y-4">
                {[
                  { title: "Fixed Wireless (5G/LTE)", desc: "High-speed wireless internet for areas without fibre coverage. Ideal for homes and businesses." },
                  { title: "Fibre To The Home (FTTH)", desc: "Ultra-fast fibre connections for residential and business customers in select areas." },
                  { title: "Business Fibre", desc: "Dedicated, symmetric bandwidth for businesses with mission-critical connectivity needs." },
                ].map((type) => (
                  <div key={type.title} className="bg-white dark:bg-zinc-800 rounded-xl p-5 border border-zinc-200 dark:border-zinc-700">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">{type.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Service Features</h2>
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                >
                  Check Availability
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Not in a listed area?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us anyway — we may be able to provide service through our partner network or have plans to expand to your area.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50">
              Contact Us
            </Link>
            <a href="tel:0340085055" className="px-8 py-3 border border-white/30 font-medium rounded-lg hover:bg-white/10">
              Call 034-0085055
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}