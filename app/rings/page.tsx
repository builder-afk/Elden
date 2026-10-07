'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, CalendarCheck, RotateCcw } from 'lucide-react';
import { products } from '@/data/catalogue';
import { Product } from '@/types';
import { useWishlist } from '@/components/wishlist/WishlistProvider';
import { ProductCard } from '@/components/products/ProductCard';
import { QuickViewModal } from '@/components/products/QuickViewModal';

const ringStyles = ['All', 'Solitaire', 'Band', 'Vintage', 'Contemporary', 'Traditional'];
const metalTypes = ['All', 'Gold', 'Rose Gold', 'White Gold'];
const ringSizes = ['All', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
const budgetRanges = [
  { label: 'All Budgets', min: 0, max: Infinity },
  { label: 'Under ₹50,000', min: 0, max: 50000 },
  { label: '₹50,000 – ₹1,00,000', min: 50000, max: 100000 },
  { label: '₹1,00,000 – ₹2,50,000', min: 100000, max: 250000 },
  { label: '₹2,50,000+', min: 250000, max: Infinity },
];

export default function RingsDiscoveryPage() {
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedMetal, setSelectedMetal] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { items } = useWishlist();

  const ringProducts = useMemo(() => {
    return products.filter((p) => {
      const isRing =
        p.collectionSlug === 'rings' ||
        p.categorySlug === 'rings' ||
        p.name.toLowerCase().includes('ring') ||
        p.name.toLowerCase().includes('band');

      if (!isRing) return false;

      if (selectedStyle !== 'All') {
        const styleMatch =
          p.style?.toLowerCase() === selectedStyle.toLowerCase() ||
          p.name.toLowerCase().includes(selectedStyle.toLowerCase());
        if (!styleMatch) return false;
      }

      if (selectedMetal !== 'All') {
        if (!p.metal?.toLowerCase().includes(selectedMetal.toLowerCase())) return false;
      }

      if (selectedSize !== 'All') {
        if (p.sizes && !p.sizes.includes(selectedSize)) return false;
      }

      const budget = budgetRanges[selectedBudgetIndex];
      if (p.price) {
        if (p.price < budget.min || p.price > budget.max) return false;
      }

      return true;
    });
  }, [selectedStyle, selectedMetal, selectedSize, selectedBudgetIndex]);

  const savedRingsCount = items.filter((item) =>
    products.some(
      (p) =>
        p.id === item.productId &&
        (p.collectionSlug === 'rings' || p.name.toLowerCase().includes('ring'))
    )
  ).length;

  const resetFilters = () => {
    setSelectedStyle('All');
    setSelectedMetal('All');
    setSelectedSize('All');
    setSelectedBudgetIndex(0);
  };

  return (
    <div className="bg-[#FFFEF7] min-h-screen">
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end justify-center overflow-hidden bg-[#2D1810]">
        <div className="absolute inset-0">
          <Image
            src="/images/collections/rings.jpg"
            alt="Lata Jewellers Engagement & Fine Rings"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1810] via-[#2D1810]/70 to-transparent" />
        </div>

        <div className="relative z-10 container-luxury text-center py-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.2em] text-[#C9A94E] font-medium mb-3"
          >
            Fine Jewellery & Bridal Bands
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#FFFEF7] tracking-[0.03em] uppercase mb-6"
          >
            Engagement & Rings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#FFFEF7]/75 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8"
          >
            From timeless solitaires to handcrafted traditional bands. Explore our
            bespoke collection, save your favourite designs, and try them on at our
            Govind Nagar showroom.
          </motion.p>

          {savedRingsCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-[#FFFEF7]/10 backdrop-blur-md border border-[#C9A94E]/40 px-5 py-2.5 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-[#C9A94E]" />
              <span className="text-xs text-[#FFFEF7]">
                You have {savedRingsCount} ring{savedRingsCount > 1 ? 's' : ''} saved in your collection
              </span>
              <Link
                href="/appointments?type=ring-consultation"
                className="text-xs font-semibold text-[#C9A94E] hover:underline"
              >
                Book Try-On →
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <section className="sticky top-16 md:top-20 z-30 bg-[#FFFEF7]/95 backdrop-blur-md border-b border-[#EDE5DC] shadow-sm py-4">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#8B7D6B] font-medium">
                  Style:
                </span>
                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                  {ringStyles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-3 py-1 text-xs transition-all cursor-pointer ${
                        selectedStyle === style
                          ? 'bg-[#722F37] text-[#FFFEF7] font-medium'
                          : 'bg-[#F5F0EB] text-[#3C2415] hover:bg-[#EDE5DC]'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#8B7D6B] font-medium">
                  Metal:
                </span>
                <select
                  value={selectedMetal}
                  onChange={(e) => setSelectedMetal(e.target.value)}
                  className="text-xs bg-[#F5F0EB] border border-[#EDE5DC] px-2.5 py-1 text-[#3C2415] focus:outline-none focus:border-[#C9A94E]"
                >
                  {metalTypes.map((metal) => (
                    <option key={metal} value={metal}>
                      {metal}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#8B7D6B] font-medium">
                  Size:
                </span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="text-xs bg-[#F5F0EB] border border-[#EDE5DC] px-2.5 py-1 text-[#3C2415] focus:outline-none focus:border-[#C9A94E]"
                >
                  {ringSizes.map((size) => (
                    <option key={size} value={size}>
                      {size === 'All' ? 'All Sizes' : `Size ${size}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#8B7D6B] font-medium">
                  Budget:
                </span>
                <select
                  value={selectedBudgetIndex}
                  onChange={(e) => setSelectedBudgetIndex(Number(e.target.value))}
                  className="text-xs bg-[#F5F0EB] border border-[#EDE5DC] px-2.5 py-1 text-[#3C2415] focus:outline-none focus:border-[#C9A94E]"
                >
                  {budgetRanges.map((range, idx) => (
                    <option key={range.label} value={idx}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-between lg:justify-end">
              <span className="text-xs text-[#8B7D6B]">
                Showing <strong className="text-[#3C2415]">{ringProducts.length}</strong> designs
              </span>
              {(selectedStyle !== 'All' ||
                selectedMetal !== 'All' ||
                selectedSize !== 'All' ||
                selectedBudgetIndex !== 0) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-[#722F37] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#FFFEF7]">
        <div className="container-luxury">
          {ringProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {ringProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    priority={idx < 4}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#F5F0EB]/50 border border-[#EDE5DC] p-8 max-w-xl mx-auto">
              <Sparkles className="w-8 h-8 text-[#C9A94E] mx-auto mb-3" />
              <h3 className="font-serif-display text-xl text-[#3C2415] mb-2">
                No designs match this combination
              </h3>
              <p className="text-xs text-[#8B7D6B] mb-6">
                Try loosening your filters or contact our showroom team for custom ring crafting.
              </p>
              <button onClick={resetFilters} className="btn-luxury-primary text-xs py-2.5">
                Reset All Filters
              </button>
            </div>
          )}

          <div className="mt-20 p-8 md:p-12 bg-[#3C2415] text-[#FFFEF7] border border-[#C9A94E]/20 text-center rounded-sm">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C9A94E] font-medium block mb-2">
              Custom Ring Consultation
            </span>
            <h2 className="font-serif-display text-2xl md:text-3xl text-[#FFFEF7] mb-4">
              Looking for a Bespoke Engagement Ring?
            </h2>
            <p className="text-[#FFFEF7]/70 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              Our master craftsmen at Govind Nagar can customize solitaire sizes, metal purities, and
              hallmarked settings tailored specifically for your love story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/appointments?type=ring-consultation"
                className="btn-luxury bg-[#C9A94E] text-[#3C2415] hover:bg-[#B09240]"
              >
                <CalendarCheck className="w-4 h-4" /> Book Ring Consultation
              </Link>
              <Link
                href="/wishlist"
                className="btn-luxury border border-[#FFFEF7]/30 text-[#FFFEF7] hover:bg-white/10"
              >
                View Saved Designs ({savedRingsCount})
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
