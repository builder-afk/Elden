'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, MessageCircle } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/components/wishlist/WishlistProvider';
import { storeInfo } from '@/data/store';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({ product, onQuickView, priority = false }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  const encodedText = encodeURIComponent(
    `Hi Lata Jewellers, I'm interested in design "${product.name}" (Code: ${product.sku}, Collection: ${product.collection}). Could you please share availability and more details?`
  );
  const whatsappUrl = storeInfo.whatsapp
    ? `https://wa.me/${storeInfo.whatsapp}?text=${encodedText}`
    : null;

  return (
    <div className="group flex flex-col h-full">
      {/* Visual Container */}
      <div className="relative overflow-hidden bg-[#F5F0EB] aspect-[4/5] mb-4 border border-[#EDE5DC]/80 group-hover:border-[#C9A94E]/60 transition-all duration-500 shadow-sm group-hover:shadow-md">
        {primaryImage?.url && !imageError ? (
          <div className="relative w-full h-full">
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, #F7E7CE 0%, #EDE5DC 50%, #D4C5A0 100%)`,
            }}
          />
        )}

        {/* Wishlist Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product.id);
          }}
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm active:scale-95 cursor-pointer"
          aria-label={isInWishlist(product.id) ? 'Remove from collection' : 'Save to collection'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isInWishlist(product.id)
                ? 'fill-[#722F37] text-[#722F37]'
                : 'text-[#3C2415]/70 hover:text-[#722F37]'
            }`}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-0.5 bg-[#3C2415] text-[#FFFEF7] text-[10px] tracking-[0.14em] uppercase font-medium shadow-sm">
              New
            </span>
          )}
          {product.availability === 'made-to-order' && (
            <span className="px-2.5 py-0.5 bg-[#722F37] text-[#FFFEF7] text-[10px] tracking-[0.14em] uppercase font-medium shadow-sm">
              Made to Order
            </span>
          )}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-[#3C2415]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 gap-2 z-10">
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="flex-1 btn-luxury bg-[#FFFEF7]/95 text-[#3C2415] text-[11px] py-2.5 px-3 hover:bg-white shadow-md flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </button>
          )}
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors shadow-md"
              title="Enquire on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          ) : (
            <Link
              href={`/products/${product.slug}`}
              className="p-2.5 bg-[#722F37] text-white hover:bg-[#5A1E25] transition-colors shadow-md"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Product Details */}
      <Link href={`/products/${product.slug}`} className="flex flex-col flex-1">
        <p className="text-[11px] text-[#8B7D6B] tracking-wider uppercase mb-1">
          {product.collection}
        </p>
        <h3 className="font-medium text-sm md:text-[15px] text-[#3C2415] group-hover:text-[#722F37] transition-colors leading-snug line-clamp-1 mb-1">
          {product.name}
        </h3>
        {product.metal && (
          <p className="text-xs text-[#8B7D6B]/80 mb-1">
            {product.metal} {product.purity ? `· ${product.purity}` : ''}
          </p>
        )}
        {product.seller && (
          <p className="text-[10px] text-[#8B7D6B] flex items-center gap-1 mb-2">
            <span className="text-[#C5A059] font-semibold">By {product.seller.storeName}</span>
            <span>· {product.seller.address.city}</span>
          </p>
        )}
        <div className="mt-auto pt-1 flex items-center justify-between">
          <p className="text-sm font-semibold text-[#3C2415]">
            {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Enquire for Price'}
          </p>
          <span className="text-[11px] text-[#722F37] uppercase tracking-wider group-hover:underline">
            Explore →
          </span>
        </div>
      </Link>
    </div>
  );
}
