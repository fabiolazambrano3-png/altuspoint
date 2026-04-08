export type Locale = 'es' | 'en';

export interface Category {
  id: string;
  name_es: string;
  name_en: string;
  slug: string;
  description_es: string;
  description_en: string;
  image_url: string;
  color?: string; // Brandbook product line color
  parent_id?: string | null;
  display_order?: number;
  children?: Category[];
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
  brand?: string;
  sku?: string;
  tags?: string[];
  brochure_url?: string | null;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  size: string;
  color: string;
  sku_variant: string;
  stock: number;
  price_diff_usd: number;
  active: boolean;
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

export interface BlogPost {
  id: string;
  title_es: string;
  title_en: string;
  slug: string;
  excerpt_es: string;
  excerpt_en: string;
  content_es: string;
  content_en: string;
  featured_image: string;
  tags: string[];
  published: boolean;
  published_at: string | null;
  author_name: string;
  meta_title_es: string;
  meta_title_en: string;
  meta_description_es: string;
  meta_description_en: string;
  created_at: string;
  updated_at: string;
}
