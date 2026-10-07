'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { products, collections, occasions } from '@/data/catalogue';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const matchedProducts = normalizedQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.collection.toLowerCase().includes(normalizedQuery) ||
          p.category.toLowerCase().includes(normalizedQuery) ||
          p.description.toLowerCase().includes(normalizedQuery) ||
          (p.metal && p.metal.toLowerCase().includes(normalizedQuery)) ||
          (p.style && p.style.toLowerCase().includes(normalizedQuery))
      )
    : [];

  const matchedCollections = normalizedQuery
    ? collections.filter(
        (c) =>
          c.name.toLowerCase().includes(normalizedQuery) ||
          c.description.toLowerCase().includes(normalizedQuery)
      )
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-start">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#3C2415]/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-[#FFFEF7] w-full max-w-4xl mx-auto mt-6 md:mt-16 border border-[#EDE5DC] shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col rounded-sm"
        >
          <div className="p-4 sm:p-6 border-b border-[#EDE5DC] flex items-center gap-4 bg-[#FFFEF7]">
            <Search className="w-5 h-5 text-[#C9A94E] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bridal, gold necklaces, solitaire rings, bangles, earrings..."
              autoFocus
              className="w-full bg-transparent text-base sm:text-lg text-[#3C2415] placeholder:text-[#8B7D6B]/60 focus:outline-none font-serif-display"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs uppercase text-[#8B7D6B] hover:text-[#3C2415]"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#F5F0EB] rounded-full text-[#3C2415] transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            {normalizedQuery ? (
              <div className="space-y-8">
                {matchedCollections.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#8B7D6B] font-semibold mb-3">
                      Collections ({matchedCollections.length})
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {matchedCollections.map((col) => (
                        <Link
                          key={col.id}
                          href={`/collections/${col.slug}`}
                          onClick={onClose}
                          className="p-3 bg-[#F5F0EB] border border-[#EDE5DC] hover:border-[#C9A94E] transition-all flex items-center justify-between"
                        >
                          <span className="font-serif-display text-sm text-[#3C2415]">
                            {col.name}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#C9A94E]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8B7D6B] font-semibold mb-4">
                    Designs ({matchedProducts.length})
                  </p>
                  {matchedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {matchedProducts.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.slug}`}
                          onClick={onClose}
                          className="flex gap-4 p-3 bg-[#F5F0EB]/60 hover:bg-[#F5F0EB] border border-[#EDE5DC] hover:border-[#C9A94E] transition-all group"
                        >
                          <div className="relative w-20 h-20 bg-[#EDE5DC] shrink-0 overflow-hidden">
                            {prod.images[0]?.url ? (
                              <Image
                                src={prod.images[0].url}
                                alt={prod.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : null}
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="text-[10px] uppercase tracking-wider text-[#8B7D6B]">
                              {prod.collection}
                            </span>
                            <h4 className="font-medium text-sm text-[#3C2415] group-hover:text-[#722F37] transition-colors line-clamp-1">
                              {prod.name}
                            </h4>
                            <span className="text-xs font-semibold text-[#3C2415] mt-1">
                              {prod.price
                                ? `₹${prod.price.toLocaleString('en-IN')}`
                                : 'Enquire for Price'}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-sm text-[#8B7D6B]">
                        No matching jewellery designs found for &ldquo;{query}&rdquo;.
                      </p>
                      <Link
                        href="/find"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 mt-4 text-xs tracking-widest uppercase text-[#722F37] font-medium"
                      >
                        Try our Jewellery Finder <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8B7D6B] font-semibold mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A94E]" /> Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Bridal Sets',
                      'Kundan Necklace',
                      'Diamond Solitaire',
                      'Temple Bangles',
                      'Polki Chandbali',
                      'Gold Rings',
                      'Engagement',
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3.5 py-1.5 bg-[#F5F0EB] hover:bg-[#F7E7CE] text-xs text-[#3C2415] border border-[#EDE5DC] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#EDE5DC] pt-5">
                  <p className="text-xs uppercase tracking-widest text-[#8B7D6B] font-semibold mb-3">
                    Explore by Occasion
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {occasions.map((occ) => (
                      <Link
                        key={occ.id}
                        href={`/collections?occasion=${occ.slug}`}
                        onClick={onClose}
                        className="p-2.5 text-xs text-[#3C2415] hover:text-[#722F37] bg-white border border-[#EDE5DC] hover:border-[#C9A94E] transition-colors block text-center"
                      >
                        {occ.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
