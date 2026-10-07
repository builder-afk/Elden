'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Store,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Building2,
  CheckCircle,
} from 'lucide-react';
import { sellers } from '@/data/sellers';
import { products } from '@/data/catalogue';

export default function SellersDirectoryPage() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['all', 'Kanpur', 'Lucknow', 'Varanasi', 'New Delhi'];

  const filteredSellers = sellers.filter((seller) => {
    const matchesCity =
      selectedCity === 'all' ||
      seller.address.city.toLowerCase() === selectedCity.toLowerCase();

    const matchesSearch =
      seller.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (seller.storeNameHindi && seller.storeNameHindi.includes(searchQuery)) ||
      seller.address.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (seller.description && seller.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFFEF7] text-[#3C2415]">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#FAF8F5] to-[#FFFEF7] border-b border-[#EDE5DC] py-12 md:py-16">
        <div className="container-luxury max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#722F37]/10 text-[#722F37] rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>100% BIS Hallmarked Partner Network</span>
          </div>

          <h1 className="font-serif-display text-3xl md:text-5xl text-[#3C2415] mb-2">
            Verified Partner Jewellers
          </h1>
          <span className="block font-hindi text-base md:text-lg text-[#8B7D6B] mb-4">
            प्रमाणित आभूषण विक्रेता • शुद्धता और विश्वास की परंपरा
          </span>

          <p className="max-w-2xl mx-auto text-xs md:text-sm text-[#8B7D6B] leading-relaxed">
            Discover historic family jewellers, heritage bridal artisans, and certified diamond houses across North India. Every listed jeweller is physically inspected and authenticated with genuine BIS Hallmarking.
          </p>
        </div>
      </section>

      {/* Filter and Search */}
      <div className="container-luxury max-w-6xl mx-auto px-4 py-8">
        <div className="bg-[#FAF8F5] p-4 border border-[#EDE5DC] rounded shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
          {/* City filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-[#8B7D6B] font-semibold mr-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#722F37]" />
              City:
            </span>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCity === city
                    ? 'bg-[#722F37] text-white shadow-sm'
                    : 'bg-white border border-[#EDE5DC] text-[#3C2415] hover:bg-[#F7E7CE]/40'
                }`}
              >
                {city === 'all' ? 'All Cities' : city}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7D6B]" />
            <input
              type="text"
              placeholder="Search jeweller name, market area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-[#EDE5DC] rounded bg-white focus:outline-none focus:border-[#722F37]"
            />
          </div>
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSellers.map((seller) => {
            const sellerProductCount = products.filter(
              (p) => p.sellerId === seller.id
            ).length;

            return (
              <div
                key={seller.id}
                className="bg-white border border-[#EDE5DC] rounded shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                {/* Header Banner */}
                <div className="relative h-44 bg-[#2A1810] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={seller.bannerUrl || '/images/hero/bridal-hero.jpg'}
                    alt={seller.storeName}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-[#C5A059] text-[#2A1810] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                      <ShieldCheck className="w-3 h-3" /> BIS Hallmarked
                    </span>
                    {seller.isFeatured && (
                      <span className="inline-flex items-center gap-1 bg-[#722F37] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        <Sparkles className="w-3 h-3 text-[#F7E7CE]" /> Featured Flagship
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-[#3C2415] flex items-center gap-1 shadow">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{seller.googleRating || '4.9'}</span>
                    <span className="text-[10px] text-[#8B7D6B] font-normal">
                      ({seller.googleReviewsCount})
                    </span>
                  </div>

                  {/* Store Name Title */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h2 className="font-serif-display text-xl md:text-2xl font-bold text-white tracking-wide">
                      {seller.storeName}
                    </h2>
                    {seller.storeNameHindi && (
                      <span className="font-hindi text-xs text-[#F7E7CE]">
                        {seller.storeNameHindi}
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs text-[#3C2415] font-medium mb-2">
                      <MapPin className="w-4 h-4 text-[#722F37] flex-shrink-0 mt-0.5" />
                      <span>
                        {seller.address.line1}, {seller.address.area}, {seller.address.city} - {seller.address.pincode}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#8B7D6B] leading-relaxed line-clamp-3">
                      {seller.description}
                    </p>
                  </div>

                  {/* Specialties & Catalogue info */}
                  <div className="pt-3 border-t border-[#EDE5DC] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-[#722F37] bg-[#722F37]/10 px-2 py-0.5 rounded">
                      {sellerProductCount > 0 ? `${sellerProductCount} Curated Pieces Online` : 'Complete Showroom Collection'}
                    </span>
                    <span className="text-[11px] text-[#8B7D6B]">
                      GSTIN: <span className="font-mono text-[10px]">{seller.gstin}</span>
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <Link
                      href={`/sellers/${seller.storeSlug}`}
                      className="btn-luxury-primary flex-1 text-center justify-center py-2.5 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Visit Storefront</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/${seller.whatsapp?.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 border border-[#EDE5DC] hover:border-[#25D366] text-[#25D366] hover:bg-emerald-50 rounded transition-colors"
                      title="WhatsApp Store Enquiry"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    <a
                      href={`tel:${seller.phone}`}
                      className="p-2.5 border border-[#EDE5DC] hover:border-[#722F37] text-[#722F37] hover:bg-[#722F37]/5 rounded transition-colors"
                      title="Call Showroom"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Join Marketplace Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#3C2415] via-[#4A151B] to-[#722F37] text-white p-8 md:p-10 rounded shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C5A059] block mb-1">
              For Authentic Jewellers
            </span>
            <h3 className="font-serif-display text-2xl md:text-3xl text-[#FFFEF7] font-bold mb-2">
              Are you a BIS Hallmarked Jeweller?
            </h3>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed">
              Join Lata Marketplace. Showcase your heritage craftsmanship to discerning jewellery buyers across India while keeping full control of your store identity and prices.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/auth/seller-register"
              className="px-6 py-3 bg-[#C5A059] hover:bg-[#d8b368] text-[#2A1810] text-xs font-bold uppercase tracking-wider rounded shadow transition-colors inline-flex items-center gap-2"
            >
              <Store className="w-4 h-4" />
              <span>Register Your Store</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
