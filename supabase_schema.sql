-- CREATE TABLES FOR SUPABASE

-- 1. Profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  phone text,
  created_at timestamptz default now()
);

-- Trigger para criar perfil automaticamente quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'phone'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remove a trigger se já existir para recriar
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Cria a trigger no evento de INSERT do auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Products table
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  "imageUrl" text,
  category text,
  "isAvailable" boolean DEFAULT true
);

-- 3. Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id text PRIMARY KEY,
  "customerName" text NOT NULL,
  items jsonb NOT NULL,
  "totalValue" numeric NOT NULL,
  "paymentMethod" text,
  date timestamptz NOT NULL,
  status text NOT NULL
);

-- 4. Coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  type text NOT NULL,
  value numeric NOT NULL,
  "expirationDate" text,
  "maxUses" int,
  "isActive" boolean DEFAULT true
);

-- DISABLE ROW LEVEL SECURITY FOR INITIAL PROTOTYPING
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons DISABLE ROW LEVEL SECURITY;
