import Link from 'next/link';
import { Sparkles, Gift, ArrowRight } from 'lucide-react';
import { products } from '@/data/catalogue';
import { ProductCard } from '@/components/products/ProductCard';

export default function GiftingPage() {
  const giftProducts = products.filter(
    (p) =>
      p.occasion?.includes('gifting') ||
      p.collectionSlug === 'pendants' ||
      p.collectionSlug === 'bracelets' ||
      (p.price && p.price <= 90000)
  );

  return (
    <div className="section-padding bg-[#FFFEF7]">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-[#C9A94E]" />
            <span className="text-subtitle text-[#C9A94E] tracking-[0.2em]">
              Precious Tokens
            </span>
          </div>
          <h1 className="heading-hero text-4xl md:text-5xl text-[#3C2415] mb-3">
            The Art of Gifting
          </h1>
          <p className="text-xs text-[#8B7D6B] max-w-lg mx-auto leading-relaxed">
            Give a gift that lasts a lifetime. From delicate gold pendants and dainty bracelets
            to hallmarked diamond studs, find timeless expressions of love.
          </p>
          <div className="line-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {giftProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-16 p-8 bg-[#F5F0EB] border border-[#EDE5DC] text-center max-w-xl mx-auto rounded-sm">
          <h3 className="font-serif-display text-xl text-[#3C2415] mb-2">
            Complimentary Luxury Packaging
          </h3>
          <p className="text-xs text-[#8B7D6B] leading-relaxed mb-6">
            Every piece purchased at Lata Jewellers comes presented in our signature velvet box,
            ready for presentation with certification of purity.
          </p>
          <Link href="/appointments" className="btn-luxury-primary text-xs py-2.5">
            Visit Showroom to Pick Up
          </Link>
        </div>
      </div>
    </div>
  );
}
