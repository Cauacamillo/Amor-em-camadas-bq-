-- Enable UUID extension just in case
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  "imageUrl" TEXT,
  category TEXT NOT NULL,
  "isAvailable" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  "customerName" TEXT NOT NULL,
  items JSONB NOT NULL,
  "totalValue" NUMERIC NOT NULL,
  "paymentMethod" TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL
);

-- Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  "expirationDate" TIMESTAMP WITH TIME ZONE NOT NULL,
  "maxUses" INTEGER NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE
);

-- Add Row Level Security (RLS) policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Development policies (allow all for simplicity - adjust for production)
CREATE POLICY "Allow anonymous read access on products"
  ON products FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert on products"
  ON products FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update on products"
  ON products FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous delete on products"
  ON products FOR DELETE USING (true);

-- Orders policies
CREATE POLICY "Allow anonymous read access on orders"
  ON orders FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert on orders"
  ON orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update on orders"
  ON orders FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous delete on orders"
  ON orders FOR DELETE USING (true);

-- Coupons policies
CREATE POLICY "Allow anonymous read access on coupons"
  ON coupons FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert on coupons"
  ON coupons FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update on coupons"
  ON coupons FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous delete on coupons"
  ON coupons FOR DELETE USING (true);
