export type Locale = 'es' | 'en';

export interface Category {
  id: string;
  name_es: string;
  name_en: string;
  slug: string;
  description_es: string;
  description_en: string;
  image_url: string;
}

export interface Product {
  id: string;
  name_es: string;
  name_en: string;
  slug: string;
  description_es: string;
  description_en: string;
  price_usd: number;
  price_bs: number;
  stock: number;
  category_id: string;
  images: string[];
  featured: boolean;
  active: boolean;
  category?: Category;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending' | 'payment_uploaded' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export type PaymentMethod = 'bank_transfer' | 'pago_movil' | 'zelle' | 'paypal' | 'crypto';

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_proof_url: string | null;
  total_usd: number;
  total_bs: number;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  phone: string;
  notes: string;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product?: Product;
}

export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  role: 'customer' | 'admin';
}

export interface StoreSetting {
  key: string;
  value: string;
}
