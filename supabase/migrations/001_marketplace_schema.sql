-- ==============================================================================
-- MIGRATION 001: MARKETPLACE MULTI-TENANT SCHEMA
-- Transforms single-store Lata Jewellers into multi-vendor marketplace
-- ==============================================================================

-- ─────────────────────────────────────────────
-- 1. SELLER PROFILES
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.sellers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    store_name VARCHAR(255) NOT NULL,
    store_slug VARCHAR(255) UNIQUE NOT NULL,
    store_name_hindi VARCHAR(255),
    description TEXT,
    logo_url TEXT,
    banner_url TEXT,
    address JSONB NOT NULL DEFAULT '{}'::jsonb,
    phone VARCHAR(50) NOT NULL,
    whatsapp VARCHAR(50),
    email VARCHAR(255) NOT NULL,
    gstin VARCHAR(20),
    pan VARCHAR(15),
    bank_details JSONB DEFAULT '{}'::jsonb,
    commission_rate NUMERIC(5, 2) DEFAULT 8.00,
    verification_status VARCHAR(30) DEFAULT 'pending'
        CHECK (verification_status IN ('pending', 'documents_submitted', 'verified', 'suspended', 'rejected')),
    is_featured BOOLEAN DEFAULT false,
    google_rating NUMERIC(2, 1),
    google_reviews_count INTEGER DEFAULT 0,
    operating_hours JSONB,
    onboarded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─────────────────────────────────────────────
-- 2. SELLER VERIFICATION DOCUMENTS
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.seller_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES public.sellers(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL
        CHECK (document_type IN ('gstin', 'pan_card', 'shop_license', 'hallmark_license', 'identity_proof', 'address_proof')),
    document_url TEXT NOT NULL,
    verification_status VARCHAR(20) DEFAULT 'pending'
        CHECK (verification_status IN ('pending', 'approved', 'rejected')),
    reviewer_notes TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─────────────────────────────────────────────
-- 3. CUSTOMER PROFILES
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    default_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─────────────────────────────────────────────
-- 4. EXTEND EXISTING PRODUCTS TABLE
-- ─────────────────────────────────────────────

-- seller_id is initially nullable so we can migrate existing data first,
-- then backfill with Lata Jewellers' seller record, then set NOT NULL.
ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS inventory_count INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
    ADD COLUMN IF NOT EXISTS shipping_info JSONB DEFAULT '{}'::jsonb;

-- ─────────────────────────────────────────────
-- 5. EXTEND REVIEWS TABLE
-- ─────────────────────────────────────────────

ALTER TABLE public.reviews
    ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS seller_id UUID REFERENCES public.sellers(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS is_verified_purchase BOOLEAN DEFAULT false;

-- ─────────────────────────────────────────────
-- 6. EXTEND COLLECTIONS TABLE
-- ─────────────────────────────────────────────

ALTER TABLE public.collections
    ADD COLUMN IF NOT EXISTS seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE;

-- ─────────────────────────────────────────────
-- 7. SHOPPING CART
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
    selected_size VARCHAR(20),
    added_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (customer_id, product_id)
);

-- ─────────────────────────────────────────────
-- 8. ORDERS
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES public.customers(id),
    seller_id UUID NOT NULL REFERENCES public.sellers(id),
    status VARCHAR(30) DEFAULT 'pending'
        CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refund_requested', 'refunded')),
    subtotal NUMERIC(12, 2) NOT NULL,
    making_charges NUMERIC(12, 2) DEFAULT 0,
    gst_amount NUMERIC(12, 2) DEFAULT 0,
    shipping_amount NUMERIC(12, 2) DEFAULT 0,
    total_amount NUMERIC(12, 2) NOT NULL,
    commission_amount NUMERIC(12, 2) NOT NULL,
    seller_payout NUMERIC(12, 2) NOT NULL,
    shipping_address JSONB NOT NULL DEFAULT '{}'::jsonb,
    payment_method VARCHAR(30),
    payment_id VARCHAR(100),
    payment_status VARCHAR(20) DEFAULT 'pending'
        CHECK (payment_status IN ('pending', 'authorized', 'captured', 'failed', 'refunded')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─────────────────────────────────────────────
-- 9. ORDER ITEMS
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    product_image TEXT,
    quantity INTEGER DEFAULT 1,
    unit_price NUMERIC(12, 2) NOT NULL,
    selected_size VARCHAR(20),
    metal VARCHAR(100),
    purity VARCHAR(50)
);

-- ─────────────────────────────────────────────
-- 10. SELLER PAYOUTS
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.seller_payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES public.sellers(id),
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_sales NUMERIC(12, 2) NOT NULL,
    total_commission NUMERIC(12, 2) NOT NULL,
    net_payout NUMERIC(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending'
        CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    razorpay_transfer_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ─────────────────────────────────────────────
-- 11. DISPUTES
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id),
    raised_by UUID NOT NULL REFERENCES auth.users(id),
    type VARCHAR(30) CHECK (type IN ('product_quality', 'not_as_described', 'not_delivered', 'damaged', 'other')),
    description TEXT NOT NULL,
    evidence_urls TEXT[],
    status VARCHAR(20) DEFAULT 'open'
        CHECK (status IN ('open', 'under_review', 'resolved_buyer', 'resolved_seller', 'escalated', 'closed')),
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- ─────────────────────────────────────────────
-- 12. INDEXES
-- ─────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_products_seller_id ON public.products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_collection ON public.products(collection_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller_id ON public.orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_cart_customer_id ON public.cart_items(customer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_seller_id ON public.reviews(seller_id);
CREATE INDEX IF NOT EXISTS idx_seller_documents_seller ON public.seller_documents(seller_id);
CREATE INDEX IF NOT EXISTS idx_disputes_order_id ON public.disputes(order_id);
CREATE INDEX IF NOT EXISTS idx_seller_payouts_seller ON public.seller_payouts(seller_id);
CREATE INDEX IF NOT EXISTS idx_sellers_store_slug ON public.sellers(store_slug);
CREATE INDEX IF NOT EXISTS idx_sellers_verification ON public.sellers(verification_status);

-- Full-text search index for product discovery
CREATE INDEX IF NOT EXISTS idx_products_search ON public.products
    USING GIN (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(metal, '')));

-- ─────────────────────────────────────────────
-- 13. ROW LEVEL SECURITY
-- ─────────────────────────────────────────────

ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;

-- SELLERS: public profiles are viewable, sellers manage their own
CREATE POLICY "Verified sellers are publicly viewable"
    ON public.sellers FOR SELECT
    USING (verification_status = 'verified');

CREATE POLICY "Sellers can view own profile"
    ON public.sellers FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Sellers can update own profile"
    ON public.sellers FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Authenticated users can register as seller"
    ON public.sellers FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- SELLER DOCUMENTS: only owner and admins
CREATE POLICY "Sellers manage own documents"
    ON public.seller_documents FOR ALL TO authenticated
    USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

-- CUSTOMERS: own data only
CREATE POLICY "Customers view own profile"
    ON public.customers FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Customers update own profile"
    ON public.customers FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Authenticated users can create customer profile"
    ON public.customers FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- PRODUCTS: update existing policies for multi-tenant
-- (existing "Public products are viewable" policy stays — just add seller management)
CREATE POLICY "Sellers manage own products"
    ON public.products FOR INSERT TO authenticated
    WITH CHECK (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

CREATE POLICY "Sellers update own products"
    ON public.products FOR UPDATE TO authenticated
    USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()))
    WITH CHECK (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

CREATE POLICY "Sellers delete own products"
    ON public.products FOR DELETE TO authenticated
    USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

-- CART: customer's own cart only
CREATE POLICY "Customers manage own cart"
    ON public.cart_items FOR ALL TO authenticated
    USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()))
    WITH CHECK (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

-- ORDERS: customers see own orders, sellers see orders placed with them
CREATE POLICY "Customers view own orders"
    ON public.orders FOR SELECT TO authenticated
    USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

CREATE POLICY "Sellers view received orders"
    ON public.orders FOR SELECT TO authenticated
    USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

CREATE POLICY "Sellers update order status"
    ON public.orders FOR UPDATE TO authenticated
    USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

-- ORDER ITEMS: follow parent order visibility
CREATE POLICY "Order items follow order access"
    ON public.order_items FOR SELECT TO authenticated
    USING (
        order_id IN (
            SELECT id FROM public.orders
            WHERE customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid())
               OR seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid())
        )
    );

-- SELLER PAYOUTS: seller's own only
CREATE POLICY "Sellers view own payouts"
    ON public.seller_payouts FOR SELECT TO authenticated
    USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

-- DISPUTES: visible to involved parties
CREATE POLICY "Dispute parties can view"
    ON public.disputes FOR SELECT TO authenticated
    USING (
        raised_by = auth.uid()
        OR order_id IN (
            SELECT id FROM public.orders
            WHERE seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid())
        )
    );

CREATE POLICY "Customers can raise disputes"
    ON public.disputes FOR INSERT TO authenticated
    WITH CHECK (raised_by = auth.uid());

-- ─────────────────────────────────────────────
-- 14. HELPER FUNCTIONS
-- ─────────────────────────────────────────────

-- Set user role in JWT custom claims
CREATE OR REPLACE FUNCTION public.set_user_role(target_user_id UUID, new_role TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE auth.users
    SET raw_app_meta_data = raw_app_meta_data || jsonb_build_object('role', new_role)
    WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auto-generate order numbers
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
    next_num INTEGER;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 9) AS INTEGER)), 0) + 1
    INTO next_num
    FROM public.orders
    WHERE order_number LIKE 'JM-' || TO_CHAR(NOW(), 'YYYY') || '-%';

    NEW.order_number := 'JM-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(next_num::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
    EXECUTE FUNCTION public.generate_order_number();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sellers_updated_at
    BEFORE UPDATE ON public.sellers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Auto-create customer profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.customers (user_id, full_name, phone)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.raw_user_meta_data->>'phone'
    );

    -- Set default role to customer
    UPDATE auth.users
    SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role": "customer"}'::jsonb
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
