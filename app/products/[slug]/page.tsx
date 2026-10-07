'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  CalendarCheck,
  ShoppingBag,
  MapPin,
  Truck,
  ShieldCheck,
  MessageCircle,
  X,
  Maximize2,
  Store,
} from 'lucide-react';
import { products } from '@/data/catalogue';
import { useWishlist } from '@/components/wishlist/WishlistProvider';
import { storeInfo } from '@/data/store';
import { ProductCard } from '@/components/products/ProductCard';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { toggleItem, isInWishlist } = useWishlist();
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHoverZooming, setIsHoverZooming] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="section-padding text-center bg-[#FFFEF7]">
        <div className="container-luxury">
          <h1 className="heading-section text-3xl text-[#3C2415]">Product Not Found</h1>
          <Link href="/collections" className="btn-luxury-outline mt-8 inline-flex">
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  const currentImage = product.images[activeImage] || product.images[0];
  const similarProducts = products
    .filter((p) => p.collectionSlug === product.collectionSlug && p.id !== product.id)
    .slice(0, 4);

  const encodedText = encodeURIComponent(
    `Hi Lata Jewellers, I'm interested in design "${product.name}" (Product Code: ${product.sku}, Collection: ${product.collection}). Could you please confirm its availability at the Govind Nagar showroom?`
  );
  const whatsappUrl = storeInfo.whatsapp
    ? `https://wa.me/${storeInfo.whatsapp}?text=${encodedText}`
    : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="section-padding-sm bg-[#FFFEF7]">
      <div className="container-luxury">
        <nav
          className="flex items-center gap-2 text-xs text-[#8B7D6B] mb-8 flex-wrap"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#722F37] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-[#722F37] transition-colors">
            Collections
          </Link>
          <span>/</span>
          <Link
            href={`/collections/${product.collectionSlug}`}
            className="hover:text-[#722F37] transition-colors"
          >
            {product.collection}
          </Link>
          <span>/</span>
          <span className="text-[#3C2415] font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Gallery & Zoom */}
          <div className="lg:col-span-7 space-y-4">
            <div
              className="relative aspect-square bg-[#F5F0EB] overflow-hidden border border-[#EDE5DC] cursor-crosshair group select-none shadow-sm rounded-sm"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoverZooming(true)}
              onMouseLeave={() => setIsHoverZooming(false)}
              onClick={() => setIsZoomModalOpen(true)}
            >
              {currentImage?.url ? (
                <div className="relative w-full h-full">
                  <Image
                    src={currentImage.url}
                    alt={currentImage.alt || product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className={`object-cover object-center transition-transform duration-200 ${
                      isHoverZooming ? 'scale-[2.2]' : 'scale-100'
                    }`}
                    style={{
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(145deg, #F7E7CE 0%, #EDE5DC 50%, #D4C5A0 100%)`,
                  }}
                />
              )}

              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded text-xs text-[#3C2415] shadow-sm flex items-center gap-1.5 hover:bg-white transition-all cursor-pointer"
                  aria-label="Open Fullscreen Zoom"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#C9A94E]" />
                  <span>Fullscreen View</span>
                </button>
              </div>

              <div className="absolute bottom-4 left-4 z-10 hidden sm:block bg-black/40 backdrop-blur-sm text-[#FFFEF7] px-3 py-1 text-[11px] rounded">
                Hover to magnify craftsmanship · Click for fullscreen
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 bg-[#F5F0EB] border-2 transition-all shrink-0 rounded-sm overflow-hidden cursor-pointer ${
                      activeImage === i
                        ? 'border-[#C9A94E] shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`View angle ${i + 1}`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || `${product.name} angle ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specs & Actions */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#C9A94E] font-medium mb-1.5">
                  {product.collection}
                </p>
                <h1 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl text-[#3C2415] leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-xs font-mono text-[#8B7D6B]">SKU / Code: {product.sku}</p>
              </div>

              <div className="bg-[#F5F0EB]/60 p-4 border border-[#EDE5DC] rounded-sm">
                <p className="font-serif-display text-2xl sm:text-3xl text-[#3C2415] font-medium">
                  {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Enquire for Price'}
                </p>
                <p className="text-[11px] text-[#8B7D6B] mt-1">
                  * Price subject to gold weight, today&apos;s hallmarked rate, and making charges at the showroom.
                </p>
              </div>

              {product.seller && (
                <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#EDE5DC] rounded shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#722F37]/10 flex items-center justify-center text-[#722F37]">
                      <Store className="w-4 h-4 text-[#C5A059]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-[#3C2415]">
                          {product.seller.storeName}
                        </span>
                        <span className="text-[9px] bg-[#C5A059]/20 text-[#3C2415] px-1.5 py-0.2 rounded font-bold uppercase">
                          Verified
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8B7D6B]">
                        {product.seller.address.area}, {product.seller.address.city} • {product.seller.googleRating || '4.9'} ★
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/sellers/${product.seller.storeSlug}`}
                    className="text-[11px] text-[#722F37] font-semibold hover:underline uppercase tracking-wider flex items-center gap-0.5"
                  >
                    <span>Visit Store</span>
                    <span>→</span>
                  </Link>
                </div>
              )}

              <div>
                <h3 className="text-xs uppercase tracking-wider text-[#8B7D6B] font-semibold mb-3">
                  Verified Jewellery Specifications
                </h3>
                <div className="divide-y divide-[#EDE5DC] border-t border-b border-[#EDE5DC] text-xs text-[#3C2415]">
                  {product.metal && (
                    <div className="py-2.5 flex justify-between">
                      <span className="text-[#8B7D6B]">Metal Type:</span>
                      <span className="font-medium">{product.metal}</span>
                    </div>
                  )}
                  {product.purity && (
                    <div className="py-2.5 flex justify-between">
                      <span className="text-[#8B7D6B]">Purity / Hallmark:</span>
                      <span className="font-medium">{product.purity}</span>
                    </div>
                  )}
                  {product.grossWeight && (
                    <div className="py-2.5 flex justify-between">
                      <span className="text-[#8B7D6B]">Gross Weight:</span>
                      <span className="font-medium">{product.grossWeight}</span>
                    </div>
                  )}
                  {product.stoneInfo && (
                    <div className="py-2.5 flex justify-between">
                      <span className="text-[#8B7D6B]">Stone / Setting:</span>
                      <span className="font-medium">{product.stoneInfo}</span>
                    </div>
                  )}
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#8B7D6B]">Showroom Availability:</span>
                    <span className="font-medium text-[#722F37]">
                      {product.availability === 'in-stock'
                        ? 'Available in Showroom'
                        : product.availability === 'made-to-order'
                        ? 'Crafted on Order'
                        : 'Contact for Availability'}
                    </span>
                  </div>
                </div>
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8B7D6B] font-medium block mb-2">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 text-xs border rounded transition-all flex items-center justify-center cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#722F37] text-[#FFFEF7] border-[#722F37] font-medium'
                            : 'bg-[#FFFEF7] text-[#3C2415] border-[#EDE5DC] hover:border-[#C9A94E]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <Link
                  href={`/appointments?productId=${product.id}&productName=${encodeURIComponent(product.name)}`}
                  className="btn-luxury-primary w-full justify-center text-xs py-3.5 shadow-sm"
                >
                  <CalendarCheck className="w-4 h-4" />
                  Book Showroom Visit to Try This Design
                </Link>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleItem(product.id)}
                    className={`btn-luxury-outline flex-1 justify-center text-xs py-3 cursor-pointer ${
                      isInWishlist(product.id) ? 'bg-[#722F37]/10 border-[#722F37]/30 text-[#722F37]' : ''
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(product.id) ? 'fill-[#722F37] text-[#722F37]' : ''
                      }`}
                    />
                    {isInWishlist(product.id) ? 'Saved to My Collection' : 'Save to My Collection'}
                  </button>

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#25D366] text-white hover:bg-[#20bd5a] rounded-sm transition-colors flex items-center justify-center"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-4 bg-[#F5F0EB]/60 border border-[#EDE5DC] rounded space-y-2.5 text-xs text-[#3C2415]/80">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-[#C9A94E] shrink-0" />
                  <span>Available for in-store trial & purchase at Govind Nagar</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C9A94E] shrink-0" />
                  <span>Same-day in-store pickup on verified stock</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#C9A94E] shrink-0" />
                  <span>Insured delivery options available on request</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C9A94E] shrink-0" />
                  <span>100% Genuine purity guarantee from Lata Jewellers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#EDE5DC]">
            <h2 className="heading-section text-2xl md:text-3xl text-[#3C2415] mb-8">
              Explore Similar Designs
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {similarProducts.map((sp) => (
                <ProductCard key={sp.id} product={sp} />
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isZoomModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8">
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute top-6 right-6 z-20 p-2.5 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-all cursor-pointer"
              aria-label="Close Zoom Modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-4xl max-h-[85vh] aspect-square">
              {currentImage?.url && (
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt || product.name}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            <div className="absolute bottom-6 left-6 text-white/80 text-xs">
              <span className="font-serif-display text-lg text-white block">{product.name}</span>
              <span>{product.sku} · Lata Jewellers Showroom Collection</span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
