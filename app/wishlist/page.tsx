'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, CalendarCheck, ArrowRight, Trash2 } from 'lucide-react';
import { useWishlist } from '@/components/wishlist/WishlistProvider';
import { products } from '@/data/catalogue';
import { ProductCard } from '@/components/products/ProductCard';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { Product } from '@/types';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const wishlistProducts = products.filter((p) =>
    items.some((item) => item.productId === p.id)
  );

  return (
    <div className="section-padding bg-[#FFFEF7] min-h-screen">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C9A94E] font-medium block mb-2">
            Curated Shortlist
          </span>
          <h1 className="heading-hero text-3xl md:text-4xl lg:text-5xl text-[#3C2415] mb-3">
            My Collection
          </h1>
          <p className="text-xs text-[#8B7D6B]">
            {wishlistProducts.length} piece{wishlistProducts.length !== 1 ? 's' : ''} saved for your showroom visit
          </p>
          <div className="line-gold mx-auto mt-4" />
        </div>

        {wishlistProducts.length > 0 ? (
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#F5F0EB] border border-[#EDE5DC] mb-8 rounded-sm">
              <p className="text-xs text-[#3C2415]">
                Planning to visit Govind Nagar? Book a visit and we will prepare these designs ahead of your arrival.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/appointments?withSaved=true"
                  className="btn-luxury-primary text-xs py-2 px-4 whitespace-nowrap flex items-center gap-1.5"
                >
                  <CalendarCheck className="w-3.5 h-3.5" /> See These At The Store
                </Link>
                <button
                  onClick={clearWishlist}
                  className="text-xs text-[#8B7D6B] hover:text-[#722F37] flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-[#F5F0EB]/50 border border-[#EDE5DC] p-8 max-w-md mx-auto rounded-sm">
            <Heart className="w-10 h-10 text-[#C9A94E]/60 mx-auto mb-4" />
            <h3 className="font-serif-display text-xl text-[#3C2415] mb-2">
              Your collection is empty
            </h3>
            <p className="text-xs text-[#8B7D6B] leading-relaxed mb-6">
              Explore our jewellery collections and click the heart icon on any design to save
              it for your upcoming showroom visit.
            </p>
            <Link href="/collections" className="btn-luxury-primary text-xs py-2.5">
              Explore Collections <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
