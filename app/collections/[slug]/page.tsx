'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { collections, products } from '@/data/catalogue';
import { ProductCard } from '@/components/products/ProductCard';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { Product } from '@/types';

export default function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const collection = collections.find((c) => c.slug === slug);
  const collectionProducts = products.filter((p) => p.collectionSlug === slug);

  if (!collection) {
    return (
      <div className="section-padding text-center bg-[#FFFEF7]">
        <div className="container-luxury">
          <h1 className="heading-section text-3xl text-[#3C2415]">Collection Not Found</h1>
          <Link href="/collections" className="btn-luxury-outline mt-8 inline-flex">
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFEF7] min-h-screen">
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-end overflow-hidden bg-[#2D1810]">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          priority
          className="object-cover object-center opacity-40 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08] via-[#1A0E08]/70 to-transparent" />

        <div className="relative z-10 container-luxury pb-12 pt-28">
          <nav className="flex items-center gap-2 text-xs text-[#FFFEF7]/70 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#C9A94E] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-[#C9A94E] transition-colors">Collections</Link>
            <span>/</span>
            <span className="text-[#FFFEF7] font-medium">{collection.name}</span>
          </nav>

          <span className="text-xs uppercase tracking-[0.2em] text-[#C9A94E] font-medium block mb-2">
            {collection.productCount} Handcrafted Designs
          </span>
          <h1 className="heading-hero text-3xl sm:text-4xl md:text-5xl text-[#FFFEF7] mb-3">
            {collection.name}
          </h1>
          <p className="text-[#FFFEF7]/80 text-sm md:text-base max-w-xl font-light">
            {collection.description}
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#FFFEF7]">
        <div className="container-luxury">
          {collectionProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {collectionProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    priority={index < 4}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#F5F0EB]/50 border border-[#EDE5DC] p-8 max-w-md mx-auto">
              <p className="text-sm text-[#8B7D6B] mb-4">No designs listed in this collection currently.</p>
              <Link href="/collections" className="btn-luxury-primary text-xs py-2.5">
                Browse Other Collections
              </Link>
            </div>
          )}
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
