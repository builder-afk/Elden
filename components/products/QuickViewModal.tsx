'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, CalendarCheck, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/components/wishlist/WishlistProvider';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { toggleItem, isInWishlist } = useWishlist();
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!product) return null;

  const currentImage = product.images[activeImgIndex] || product.images[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#3C2415]/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#FFFEF7] w-full max-w-3xl overflow-hidden shadow-2xl border border-[#EDE5DC] z-10 my-8"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-white text-[#3C2415] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative bg-[#F5F0EB] aspect-square md:aspect-auto md:h-full min-h-[320px]">
              {currentImage?.url ? (
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt || product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(135deg, #F7E7CE 0%, #EDE5DC 50%, #D4C5A0 100%)`,
                  }}
                />
              )}
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#C9A94E] font-medium mb-1.5">
                  {product.collection}
                </p>
                <h2 className="font-serif-display text-2xl text-[#3C2415] mb-2 leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs text-[#8B7D6B] mb-4">Code: {product.sku}</p>

                <p className="text-xl font-semibold text-[#3C2415] mb-4">
                  {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Enquire for Price'}
                </p>

                <p className="text-sm text-[#3C2415]/80 leading-relaxed line-clamp-3 mb-6">
                  {product.description}
                </p>

                <div className="space-y-1.5 text-xs text-[#3C2415]/70 border-t border-b border-[#EDE5DC] py-3 mb-6">
                  {product.metal && (
                    <div className="flex justify-between">
                      <span className="text-[#8B7D6B]">Metal:</span>
                      <span className="font-medium text-[#3C2415]">{product.metal}</span>
                    </div>
                  )}
                  {product.purity && (
                    <div className="flex justify-between">
                      <span className="text-[#8B7D6B]">Purity:</span>
                      <span className="font-medium text-[#3C2415]">{product.purity}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#8B7D6B]">Availability:</span>
                    <span className="font-medium text-[#722F37]">
                      {product.availability === 'in-stock'
                        ? 'In Showroom'
                        : product.availability === 'made-to-order'
                        ? 'Made to Order'
                        : 'On Enquiry'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleItem(product.id)}
                    className="flex-1 btn-luxury-outline text-xs py-3 justify-center gap-2"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(product.id) ? 'fill-[#722F37] text-[#722F37]' : ''
                      }`}
                    />
                    {isInWishlist(product.id) ? 'Saved' : 'Save to Wishlist'}
                  </button>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="btn-luxury-primary text-xs py-3 px-4 flex items-center justify-center gap-1"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <Link
                  href="/appointments"
                  onClick={onClose}
                  className="w-full btn-luxury-gold text-xs py-3 flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Book Store Visit to Try
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
