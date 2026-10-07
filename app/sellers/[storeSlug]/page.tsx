import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowLeft,
  Gem,
  Award,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { getSellerBySlug, sellers } from '@/data/sellers';
import { products } from '@/data/catalogue';
import { ProductCard } from '@/components/products/ProductCard';

interface SellerPageProps {
  params: Promise<{
    storeSlug: string;
  }>;
}

export async function generateStaticParams() {
  return sellers.map((seller) => ({
    storeSlug: seller.storeSlug,
  }));
}

export default async function SellerStorefrontPage({ params }: SellerPageProps) {
  const { storeSlug } = await params;
  const seller = getSellerBySlug(storeSlug);

  if (!seller) {
    notFound();
  }

  // Get products for this seller
  const sellerProducts = products.filter(
    (p) => p.sellerId === seller.id || (!p.sellerId && seller.id === 'seller-lata-001')
  );

  return (
    <div className="min-h-screen bg-[#FFFEF7] text-[#3C2415]">
      {/* Breadcrumb / Back link */}
      <div className="bg-[#FAF8F5] border-b border-[#EDE5DC] py-3">
        <div className="container-luxury max-w-6xl mx-auto px-4 flex items-center justify-between text-xs">
          <Link
            href="/sellers"
            className="inline-flex items-center gap-1.5 text-[#8B7D6B] hover:text-[#722F37] font-semibold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Partner Jewellers</span>
          </Link>
          <div className="flex items-center gap-2 text-[#8B7D6B]">
            <span>Marketplace</span>
            <span>/</span>
            <span className="text-[#3C2415] font-medium">{seller.storeName}</span>
          </div>
        </div>
      </div>

      {/* Store Banner Hero */}
      <section className="relative bg-[#2A1810] text-white">
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={seller.bannerUrl || '/images/hero/bridal-hero.jpg'}
            alt={seller.storeName}
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810] via-black/40 to-transparent" />
        </div>

        {/* Store Profile Floating Header */}
        <div className="container-luxury max-w-6xl mx-auto px-4 relative -mt-24 md:-mt-28 pb-8">
          <div className="bg-white text-[#3C2415] border border-[#EDE5DC] rounded-lg shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left Identity */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#C5A059] text-[#2A1810] text-[10px] font-bold uppercase tracking-wider rounded">
                    <ShieldCheck className="w-3.5 h-3.5" /> BIS Hallmarked Store
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider rounded">
                    <CheckCircle2 className="w-3 h-3" /> Physically Inspected
                  </span>
                  <div className="flex items-center gap-1 bg-[#FAF8F5] border border-[#EDE5DC] px-2 py-0.5 rounded text-xs font-bold text-[#3C2415]">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{seller.googleRating || '4.9'}</span>
                    <span className="text-[10px] text-[#8B7D6B] font-normal">
                      ({seller.googleReviewsCount} reviews)
                    </span>
                  </div>
                </div>

                <h1 className="font-serif-display text-3xl md:text-4xl text-[#3C2415] font-bold">
                  {seller.storeName}
                </h1>
                {seller.storeNameHindi && (
                  <p className="font-hindi text-sm md:text-base text-[#8B7D6B]">
                    {seller.storeNameHindi}
                  </p>
                )}

                <div className="flex items-start gap-1.5 text-xs text-[#8B7D6B] pt-1">
                  <MapPin className="w-4 h-4 text-[#722F37] flex-shrink-0 mt-0.5" />
                  <span>
                    {seller.address.line1}, {seller.address.area}, {seller.address.city}, {seller.address.state} - {seller.address.pincode}
                  </span>
                </div>
              </div>

              {/* Right Action CTAs */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 flex-shrink-0">
                <a
                  href={`https://wa.me/${seller.whatsapp?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Namaste ${seller.storeName}, I saw your jewellery on Lata Marketplace and would like to enquire about your designs.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Store</span>
                </a>

                <Link
                  href="/bridal/consultation"
                  className="btn-luxury-primary text-center justify-center py-2.5 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </Link>

                <a
                  href={`tel:${seller.phone}`}
                  className="px-4 py-2 border border-[#3C2415]/20 hover:border-[#722F37] text-xs font-semibold uppercase tracking-wider rounded text-[#3C2415] hover:text-[#722F37] text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{seller.phone}</span>
                </a>
              </div>
            </div>

            {/* Store Highlights Strip */}
            <div className="mt-6 pt-6 border-t border-[#EDE5DC] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
                <div>
                  <span className="font-semibold block text-[#3C2415]">BIS Purity Assured</span>
                  <span className="text-[10px] text-[#8B7D6B]">Every piece laser stamped</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#722F37] flex-shrink-0" />
                <div>
                  <span className="font-semibold block text-[#3C2415]">Showroom Hours</span>
                  <span className="text-[10px] text-[#8B7D6B]">
                    {seller.operatingHours?.open || '10:00 AM'} - {seller.operatingHours?.close || '09:00 PM'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-semibold block text-[#3C2415]">GST Registered</span>
                  <span className="text-[10px] text-[#8B7D6B] font-mono">{seller.gstin}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
                <div>
                  <span className="font-semibold block text-[#3C2415]">Insured Transit</span>
                  <span className="text-[10px] text-[#8B7D6B]">Pan-India doorstep delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalogue Section */}
      <section className="container-luxury max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#722F37] uppercase tracking-wider font-semibold mb-1">
              <Gem className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Showcase Collection</span>
            </div>
            <h2 className="font-serif-display text-2xl md:text-3xl text-[#3C2415]">
              Jewellery by {seller.storeName}
            </h2>
            <p className="text-xs text-[#8B7D6B] mt-0.5">
              Browse authentic handcrafted jewellery pieces available for immediate purchase or custom order.
            </p>
          </div>

          <span className="text-xs text-[#8B7D6B] bg-[#FAF8F5] px-3 py-1.5 rounded border border-[#EDE5DC] font-medium">
            {sellerProducts.length} Pieces Available
          </span>
        </div>

        {/* Product Grid */}
        {sellerProducts.length === 0 ? (
          <div className="p-12 text-center bg-[#FAF8F5] border border-[#EDE5DC] rounded text-[#8B7D6B]">
            <Sparkles className="w-10 h-10 text-[#C5A059] mx-auto mb-2 opacity-60" />
            <p className="text-base font-semibold text-[#3C2415]">New Collection Being Curated</p>
            <p className="text-xs mt-1">
              Please contact the showroom directly via WhatsApp or Phone to view exclusive in-store designs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Heritage Story Section */}
        {seller.description && (
          <div className="mt-16 bg-[#FAF8F5] border border-[#EDE5DC] rounded-lg p-6 md:p-8">
            <h3 className="font-serif-display text-xl text-[#3C2415] font-bold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C5A059]" />
              <span>About {seller.storeName} & Their Heritage</span>
            </h3>
            <p className="text-xs md:text-sm text-[#8B7D6B] leading-relaxed">
              {seller.description}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
