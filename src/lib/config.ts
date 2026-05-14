/**
 * SITE CONFIGURATION
 * ==================
 * Edit this file to update your website content.
 * After editing, rebuild with: npm run build
 */

// Company Info
export const company = {
  name: "Pan Africa Telecom",
  shortName: "PAT",
  tagline: "Connecting unserved & underserved digital experiences",
  description: "We collaborate with smart and creative people to build awesome internet service provider to connect unserved & underserved in Africa to the Internet.",
  address: "26 Marconi Drive, Riverside Industrial, Newcastle, 2940, South Africa",
  phone: "034-0085055",
  whatsapp: "+27871525695",
  email: "info@PanAfricaTelecom.co.za",
  supportEmail: "support@panafricatelecom.co.za",
  portalUrl: "https://portal.panafricatelecom.co.za",
  facebookUrl: "https://www.facebook.com/PanAfricaTelecom/",
  linkedinUrl: "https://za.linkedin.com/company/panafricatelecom",
  youtubeUrl: "https://www.youtube.com/@PanAfricaTelecom",
  icasaLicense: "2411/CECNS/CECS/FEB/2023",
};

// Shipping & Warranty (shown on product pages) — empty strings to hide
export const shippingWarranty = {
  delivery: "",
  warranty: "",
};

// Navigation Links
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/coverage", label: "Coverage" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

// Hero Slides
export const heroSlides = [
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

// Services (for homepage grid)
export const services = [
  {
    icon: "Globe",
    title: "Global Connectivity",
    description: "MPLS VPN, SDWAN, and IEPL solutions for enterprise connectivity across Africa and globally.",
    href: "/services/global-connectivity",
  },
  {
    icon: "Monitor",
    title: "IT Services",
    description: "Professional IT support, network design, and managed services for businesses of all sizes.",
    href: "/services/it-services",
  },
  {
    icon: "Package",
    title: "Equipment Distribution",
    description: "Enterprise, ISP, and telecommunications equipment distribution across Sub-Saharan Africa.",
    href: "/services/equipment",
  },
  {
    icon: "Phone",
    title: "VoIP / SMS / A2P",
    description: "Cost-effective voice services with number portability and SMS/A2P messaging solutions.",
    href: "/services/voip",
  },
  {
    icon: "Shield",
    title: "CCTV Installation",
    description: "Professional CCTV supply and installation for homes and businesses. Remote monitoring.",
    href: "/services/cctv",
  },
  {
    icon: "Zap",
    title: "Renewable Energy",
    description: "Solar panel and inverter installation for off-grid and backup power solutions.",
    href: "/services/renewable",
  },
];

// Stats
export const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Active Clients" },
  { value: "99.9%", label: "Uptime" },
  { value: "N-S", label: "Support" },
];

// Why Choose Us
export const whyChooseUs = [
  "ICASA Licensed Telecommunications Provider",
  "Experienced engineers and technical staff",
  "Enterprise-grade infrastructure",
  "Technical support available",
  "Number portability available",
  "Nationwide coverage",
];

// Support Hours
export const supportHours = [
  { days: "Monday - Friday", hours: "08:00 - 17:00" },
  { days: "Saturday", hours: "09:00 - 13:00" },
  { days: "Sunday", hours: "Closed" },
];

// Coverage Areas
export const coverageAreas = [
  { region: "KwaZulu-Natal", areas: ["Ballito", "Salt Rock", "Shaka's Head", "Umhlali", "Blythedale Beach"] },
  { region: "Gauteng", areas: ["Johannesburg", "Pretoria", "Midrand", "Centurion"] },
  { region: "Limpopo", areas: ["Polokwane", "Mokopane", "Mokomo"] },
  { region: "Mpumalanga", areas: ["Nelspruit", "Witrivier", "Sabie"] },
  { region: "Free State", areas: ["Bloemfontein", "Welkom", "Bethlehem"] },
  { region: "Eastern Cape", areas: ["East London", "Port Elizabeth", "Mthatha"] },
  { region: "Western Cape", areas: ["Cape Town", "Stellenbosch", "Paarl"] },
  { region: "North West", areas: ["Rustenburg", "Klerksdorp", "Potchefstroom"] },
];

// Footer Quick Links
export const footerQuickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/coverage", label: "Coverage" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export const footerServiceLinks = [
  { href: "/services/global-connectivity", label: "Global Connectivity" },
  { href: "/services/it-services", label: "IT Services" },
  { href: "/services/equipment", label: "Equipment Distribution" },
  { href: "/services/voip", label: "VoIP / SMS / A2P" },
  { href: "/services/cctv", label: "CCTV Installation" },
  { href: "/services/renewable", label: "Renewable Energy" },
];