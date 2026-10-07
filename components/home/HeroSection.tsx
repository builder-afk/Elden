'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
import { storeInfo } from '@/data/store';

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-[#1A0E08]">
      {/* Background Editorial Jewellery Photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/bridal-hero.jpg"
          alt="Lata Jewellers Royal Indian Bridal & Heritage Jewellery"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] duration-[12000ms] opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08] via-[#1A0E08]/60 to-[#1A0E08]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0E08]/80 via-[#1A0E08]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury pb-16 md:pb-24 pt-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A94E]" />
            <span className="text-subtitle text-[#C9A94E] tracking-[0.2em]">
              {storeInfo.nameHindi} · Govind Nagar, Kanpur
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="heading-hero text-[#FFFEF7] text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 drop-shadow-md"
          >
            Jewellery for
            <br />
            Generations.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#FFFEF7]/85 text-base md:text-lg leading-relaxed max-w-xl mb-10 drop-shadow-sm font-light"
          >
            Discover timeless designs, exquisite 22K craftsmanship, and jewellery
            curated for life&apos;s most meaningful milestones at Lata Jewellers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              href="/collections"
              className="btn-luxury bg-[#FFFEF7] text-[#3C2415] hover:bg-[#F7E7CE] group shadow-lg"
            >
              Explore Collections
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/store"
              className="btn-luxury border border-[#FFFEF7]/40 text-[#FFFEF7] hover:bg-[#FFFEF7]/10 backdrop-blur-sm"
            >
              Visit Showroom
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/10"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 text-[#C9A94E] fill-[#C9A94E]"
                />
              ))}
            </div>
            <span className="text-xs text-[#FFFEF7]">
              <strong className="font-semibold text-[#FFFEF7]">{storeInfo.googleRating}</strong>
              {' '}Google Rating
            </span>
            <span className="text-white/30">·</span>
            <span className="text-xs text-[#FFFEF7]/70">
              {storeInfo.googleReviews} Reviews
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#FFFEF7]/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#FFFEF7]/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
