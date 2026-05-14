"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    title: "Global Connectivity",
    subtitle: "MPLS VPN / SDWAN / IEPL",
    description: "Enterprise-grade connectivity solutions connecting your business across Africa and beyond.",
    cta: "Learn More",
    ctaLink: "/services/global-connectivity",
  },
  {
    title: "Fixed Wireless Internet",
    subtitle: "High-Speed Broadband",
    description: "Reliable internet for homes and businesses in unserved and underserved areas.",
    cta: "View Coverage",
    ctaLink: "/coverage",
  },
  {
    title: "VoIP Solutions",
    subtitle: "Voice / SMS / A2P Services",
    description: "Cost-effective voice services with number portability across South Africa.",
    cta: "Explore VoIP",
    ctaLink: "/services/voip",
  },
  {
    title: "IT Services & Support",
    subtitle: "Technical Assistance",
    description: "Professional IT support and managed services for businesses of all sizes.",
    cta: "Get Support",
    ctaLink: "/support",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent(prev => (prev + 1) % slides.length);

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <p className="text-blue-300 font-medium tracking-wide uppercase text-sm">
              {slides[current].subtitle}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {slides[current].title}
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed max-w-lg">
              {slides[current].description}
            </p>
            <a
              href={slides[current].ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 font-medium rounded-lg transition-colors"
            >
              {slides[current].cta}
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Visual - abstract pattern */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-blue-600/30 rounded-full animate-pulse" />
              <div className="absolute inset-8 bg-blue-500/30 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute inset-16 bg-blue-400/40 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-blue-500/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-white/20 rounded-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              i === current ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Prev/Next buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}