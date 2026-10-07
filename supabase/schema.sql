-- ==============================================================================
-- LATA JEWELLERS (लता ज्वैलर्स) — PRODUCTION POSTGRESQL / SUPABASE DATABASE SCHEMA
-- Govind Nagar, Kanpur, Uttar Pradesh
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    product_count INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. METALS TABLE
CREATE TABLE IF NOT EXISTS public.metals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    purity_options TEXT[] DEFAULT ARRAY['22K (916)', '18K (750)', '14K (585)'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    metal VARCHAR(100),
    purity VARCHAR(50),
    gross_weight VARCHAR(50),
    net_weight VARCHAR(50),
    stone_info TEXT,
    sizes TEXT[] DEFAULT ARRAY[]::TEXT[],
    price NUMERIC(12, 2),
    making_charge VARCHAR(100),
    availability VARCHAR(50) DEFAULT 'in-stock' CHECK (availability IN ('in-stock', 'made-to-order', 'enquire')),
    certification TEXT,
    featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    occasion TEXT[] DEFAULT ARRAY[]::TEXT[],
    style VARCHAR(50) DEFAULT 'traditional' CHECK (style IN ('traditional', 'contemporary', 'minimal', 'statement')),
    care_info TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL,
    type VARCHAR(50) DEFAULT 'store-visit' CHECK (type IN ('store-visit', 'bridal-consultation', 'general', 'ring-consultation')),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'visited', 'follow-up', 'converted', 'closed')),
    notes TEXT,
    product_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    assigned_staff VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. BRIDAL ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.bridal_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    wedding_date DATE,
    appointment_date DATE NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    jewellery_interests TEXT[] DEFAULT ARRAY[]::TEXT[],
    budget_range VARCHAR(100),
    additional_requirements TEXT,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'visited', 'follow-up', 'converted', 'closed')),
    assigned_specialist VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author VARCHAR(255) NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'google',
    featured BOOLEAN DEFAULT true,
    date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. STORE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.store_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bridal_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public collections are viewable by everyone" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public metals are viewable by everyone" ON public.metals FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public product images are viewable by everyone" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public store settings are viewable by everyone" ON public.store_settings FOR SELECT USING (true);

CREATE POLICY "Anyone can create an appointment" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create a bridal enquiry" ON public.bridal_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins have full access to appointments" ON public.appointments FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to bridal_enquiries" ON public.bridal_enquiries FOR ALL TO authenticated USING (true);
