'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { products } from '@/data/catalogue';
import { Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { QuickViewModal } from '@/components/products/QuickViewModal';

const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

export function SignatureDesigns() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section className="section-padding bg-[#FFFEF7]" id="signature">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <p className="text-subtitle text-[#8B7D6B] mb-3">Curated Highlights</p>
            <h2 className="heading-section text-3xl md:text-4xl lg:text-5xl text-[#3C2415]">
              Signature Designs
            </h2>
          </div>
          <Link
            href="/collections"
            className="mt-4 md:mt-0 text-xs tracking-[0.14em] uppercase text-[#722F37] hover:text-[#5A1E25] transition-colors border-b border-[#722F37]/30 pb-0.5"
          >
            Explore All Designs →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
                priority={index < 3}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
