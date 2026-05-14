/**
 * PRODUCT CATALOG
 * ===============
 * Edit this file to add, remove, or update products.
 * Images: Use Unsplash URLs or upload to /public/products/
 * Categories: "connectivity" | "equipment" | "cctv" | "renewable" | "voip"
 * 
 * After editing, rebuild with: npm run build
 */

import { Product } from "./types";

export const products: Product[] = [
  // === CONNECTIVITY ===
  {
    id: "1",
    slug: "cpe-router-5g",
    name: "5G CPE Router",
    price: 2499,
    description: "High-speed 5G CPE router for residential and business use",
    longDescription: "Experience lightning-fast 5G connectivity with our enterprise-grade CPE router. Supports up to 64 connected devices with dual-band WiFi 6, making it ideal for homes and small businesses in areas without fibre coverage.",
    category: "connectivity",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    stock: 15,
    features: [
      "5G SA/NSA support",
      "WiFi 6 (1800Mbps)",
      "4x GE ports",
      "External antenna support",
      "IPsec VPN",
    ],
  },

  {
    id: "2",
    slug: "wifi-6-access-point",
    name: "WiFi 6 Access Point",
    price: 1299,
    description: "Business-class WiFi 6 AP for high-density environments",
    longDescription: "Enterprise-grade WiFi 6 access point perfect for offices, warehouses, and multi-dwelling units. Supports MU-MIMO, OFDMA, and up to 256 concurrent clients with seamless roaming.",
    category: "connectivity",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    stock: 22,
    features: [
      "WiFi 6 (1800Mbps)",
      "MU-MIMO 4x4",
      "PoE+ powered",
      "Seamless roaming",
      "VLAN support",
    ],
  },

  {
    id: "3",
    slug: "poe-switch-8port",
    name: "8-Port PoE+ Switch",
    price: 1899,
    description: "8-port Gigabit PoE+ switch, 120W total budget",
    longDescription: "Managed Gigabit PoE+ switch with 8 ports at 30W each. Perfect for powering IP cameras, access points, and VoIP phones from a single device. Features VLAN, QoS, and LACP link aggregation.",
    category: "connectivity",
    image: "https://images.unsplash.com/photo-1606904825846-647eb07bc5d8?w=600&h=400&fit=crop",
    stock: 18,
    features: [
      "8x Gigabit PoE+",
      "120W total budget",
      "L2 managed",
      "VLAN/QoS",
      "19\" rack mount",
    ],
  },

  // === CCTV ===
  {
    id: "4",
    slug: "ip-camera-dome-4mp",
    name: "4MP Dome IP Camera",
    price: 899,
    description: "4MP dome IP camera with IR night vision",
    longDescription: "Indoor/outdoor dome IP camera with 4MP resolution, 30m IR night vision, and H.265+ compression. IP67 weatherproof and IK10 vandal-proof rated. Supports NVR and cloud recording.",
    category: "cctv",
    image: "https://images.unsplash.com/photo-1557862921-37829b5c4c37?w=600&h=400&fit=crop",
    stock: 35,
    features: [
      "4MP (2688x1520)",
      "30m IR night vision",
      "H.265+ compression",
      "IP67 weatherproof",
      "MicroSD slot",
    ],
  },

  {
    id: "5",
    slug: "nvr-8channel",
    name: "8-Channel NVR",
    price: 3499,
    description: "8-channel 4K NVR with 2TB HDD",
    longDescription: "Professional 8-channel Network Video Recorder with 4K recording capability and 2TB surveillance-grade HDD (expandable to 16TB). Supports AI-based motion detection, face recognition, and remote viewing via mobile app.",
    category: "cctv",
    image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&h=400&fit=crop",
    stock: 12,
    features: [
      "8-channel 4K",
      "2TB HDD (expandable)",
      "AI detection",
      "HDMI 4K output",
      "Mobile app",
    ],
  },

  // === RENEWABLE / SOLAR ===
  {
    id: "6",
    slug: "solar-panel-400w",
    name: "400W Solar Panel",
    price: 4299,
    description: "Mono-crystalline 400W solar panel",
    longDescription: "Premium mono-crystalline 400W solar panel with 21% efficiency. Weather-resistant aluminum frame, pre-drilled mounting holes, and MC4 connectors. Ideal for off-grid power systems and battery charging.",
    category: "renewable",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    stock: 20,
    features: [
      "400W output",
      "21% efficiency",
      "MC4 connectors",
      "25-year warranty",
      "Anti-reflective coating",
    ],
  },

  {
    id: "7",
    slug: "inverter-3000w",
    name: "3000W Inverter",
    price: 5599,
    description: "3000W pure sine wave inverter with MPPT",
    longDescription: "All-in-one 3000W inverter with built-in MPPT solar charge controller. Pure sine wave output, 93% conversion efficiency, LCD display, and multiple protection features. Powers appliances up to 6000W surge.",
    category: "renewable",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&h=400&fit=crop",
    stock: 8,
    features: [
      "3000W continuous",
      "MPPT controller",
      "Pure sine wave",
      "LCD display",
      "USB/WiFi port",
    ],
  },

  // === VOIP ===
  {
    id: "8",
    slug: "voip-handset",
    name: "VoIP Desk Phone",
    price: 699,
    description: "HD VoIP desk phone with 4.3\" color display",
    longDescription: "Professional HD VoIP desk phone with 4.3\" color LCD, 6 SIP accounts, dual Gigabit ports, and PoE support. Features full-duplex speakerphone, wireless headset support, and programmable keys.",
    category: "voip",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    stock: 40,
    features: [
      "HD audio",
      "4.3\" color LCD",
      "6 SIP accounts",
      "Dual Gigabit",
      "PoE support",
    ],
  },

  // === EQUIPMENT ===
  {
    id: "9",
    slug: "poe-injector-60w",
    name: "PoE++ Injector 60W",
    price: 499,
    description: "60W PoE++ injector for high-power devices",
    longDescription: "Gigabit PoE++ injector delivering up to 60W via Cat5e/Cat6 cable. IEEE 802.3bt compliant, compatible with 802.3af/at/bt devices. Compact desktop design with DIN rail mounting option.",
    category: "equipment",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    stock: 50,
    features: [
      "60W PoE++",
      "Gigabit speeds",
      "IEEE 802.3bt",
      "Compact design",
      "DIN rail mount",
    ],
  },

  {
    id: "10",
    slug: "cat6-cable-100m",
    name: "Cat6 Cable 100m",
    price: 899,
    description: "100m Cat6 UTP cable, CMP/CM rated",
    longDescription: "Premium Cat6 UTP cable 100m roll, CMP/CM fire-rated for indoor/outdoor use. Supports 10Gbps up to 55m and 1Gbps up to 100m. Snagless RJ45 connectors compatible.",
    category: "equipment",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    stock: 60,
    features: [
      "Cat6 compliant",
      "100m length",
      "CMR rated",
      "23AWG",
      "UV resistant",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter(p => p.category === category);
}

/**
 * ADDING A NEW PRODUCT:
 * Copy this template:
 * 
 * {
 *   id: "unique-id",
 *   slug: "product-url-slug",
 *   name: "Product Name",
 *   price: 1999,
 *   description: "Short description for cards",
 *   longDescription: "Long description for product page",
 *   category: "connectivity" | "equipment" | "cctv" | "renewable" | "voip",
 *   image: "https://...",
 *   stock: 10,
 *   features: ["Feature 1", "Feature 2", "Feature 3"],
 * }
 */