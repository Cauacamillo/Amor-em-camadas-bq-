-- Migration generated for Supabase

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  "imageUrl" text,
  category text,
  "isAvailable" boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id text PRIMARY KEY,
  "customerName" text NOT NULL,
  items jsonb NOT NULL,
  "totalValue" numeric NOT NULL,
  "paymentMethod" text,
  date timestamptz NOT NULL,
  status text NOT NULL
);

CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  type text NOT NULL,
  value numeric NOT NULL,
  "expirationDate" text,
  "maxUses" int,
  "isActive" boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- DISABLE ROW LEVEL SECURITY FOR INITIAL PROTOTYPING
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE coupons DISABLE ROW LEVEL SECURITY;
