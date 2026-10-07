'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products } from '@/data/catalogue';
import { ProductCard } from '@/components/products/ProductCard';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { Product } from '@/types';

const bridalCategories = [
  { name: 'All Bridal', slug: 'all' },
  { name: 'Necklaces', slug: 'necklaces' },
  { name: 'Earrings', slug: 'earrings' },
  { name: 'Bangles', slug: 'bangles' },
  { name: 'Rings', slug: 'rings' },
  { name: 'Sets', slug: 'sets' },
];

export default function BridalPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const bridalProducts = products.filter((p) => {
    const isBridal =
      p.occasion?.includes('wedding') ||
      p.collectionSlug === 'bridal-jewellery' ||
      p.name.toLowerCase().includes('bridal') ||
      p.name.toLowerCase().includes('kundan') ||
      p.name.toLowerCase().includes('temple');

    if (!isBridal) return false;
    if (activeCategory === 'all') return true;
    if (activeCategory === 'necklaces') return p.categorySlug === 'necklaces';
    if (activeCategory === 'earrings') return p.categorySlug === 'earrings';
    if (activeCategory === 'bangles') return p.categorySlug === 'bangles';
    if (activeCategory === 'rings') return p.categorySlug === 'rings';
    if (activeCategory === 'sets') return p.name.toLowerCase().includes('set');
    return true;
  });

  return (
    <div className="bg-[#FFFEF7] min-h-screen">
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#2D1810]">
        <Image
          src="/images/hero/bridal-hero.jpg"
          alt="Lata Jewellers Royal Bridal Edit"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08] via-[#1A0E08]/50 to-[#1A0E08]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0E08]/80 via-transparent to-transparent" />

        <div className="relative z-10 container-luxury pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#C9A94E]" />
            <span className="text-subtitle text-[#C9A94E] tracking-[0.2em]">
              The Bridal Edit · दुल्हन के लिए
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-hero text-4xl md:text-5xl lg:text-6xl text-[#FFFEF7] mb-6"
          >
            The Bridal Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFFEF7]/85 text-base md:text-lg max-w-xl mb-8 font-light"
          >
            Your wedding deserves extraordinary jewellery. Explore our curated
            bridal collections, crafted for the most cherished day of your life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/bridal/consultation"
              className="btn-luxury bg-[#C9A94E] text-[#3C2415] hover:bg-[#D4BA6A] shadow-lg"
            >
              Book Bridal Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-4 bg-[#FFFEF7]/95 backdrop-blur-md border-b border-[#EDE5DC] sticky top-16 md:top-20 z-30 shadow-sm">
        <div className="container-luxury">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
            {bridalCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`text-xs tracking-[0.1em] uppercase whitespace-nowrap px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeCategory === cat.slug
                    ? 'bg-[#722F37] text-[#FFFEF7] font-medium shadow-sm'
                    : 'bg-[#F5F0EB] text-[#3C2415] hover:bg-[#EDE5DC]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#FFFEF7]">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bridalProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#3C2415] text-center text-[#FFFEF7]">
        <div className="container-luxury">
          <h2 className="heading-section text-2xl md:text-3xl text-[#FFFEF7] mb-4">
            Begin Your Bridal Journey
          </h2>
          <p className="text-[#FFFEF7]/70 max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Book a private consultation at our Govind Nagar showroom and let our master
            specialists help you design your complete bridal package.
          </p>
          <Link
            href="/bridal/consultation"
            className="btn-luxury bg-[#C9A94E] text-[#3C2415] hover:bg-[#D4BA6A]"
          >
            Book Bridal Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
