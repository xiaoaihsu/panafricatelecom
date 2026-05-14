export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  category: "connectivity" | "equipment" | "cctv" | "renewable" | "voip";
  image: string;
  stock: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
}