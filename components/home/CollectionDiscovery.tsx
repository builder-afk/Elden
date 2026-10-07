'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { collections } from '@/data/catalogue';

const featuredCollections = collections.filter((c) => c.featured);

export function CollectionDiscovery() {
  return (
    <section className="section-padding bg-[#FFFEF7]" id="collections">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="text-subtitle text-[#8B7D6B] mb-3">Curated Categories</p>
          <h2 className="heading-section text-3xl md:text-4xl lg:text-5xl text-[#3C2415]">
            Our Collections
          </h2>
          <div className="line-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featuredCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden bg-[#2D1810] rounded-sm shadow-md border border-[#EDE5DC]/60 ${
                index === 0 || index === 3
                  ? 'md:col-span-2 lg:col-span-2 aspect-[16/9] md:aspect-[2/1]'
                  : 'aspect-[3/4] md:aspect-[3/4]'
              }`}
            >
              <Link href={`/collections/${collection.slug}`} className="block h-full relative">
                <Image
                  src={collection.image}
                  alt={`Lata Jewellers ${collection.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08]/90 via-[#1A0E08]/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A94E] font-medium block mb-1">
                        {collection.productCount} Designs
                      </span>
                      <h3 className="font-serif-display text-xl md:text-2xl lg:text-3xl text-[#FFFEF7] tracking-[0.02em] mb-1 drop-shadow-sm">
                        {collection.name}
                      </h3>
                      <p className="text-[#FFFEF7]/75 text-xs sm:text-sm hidden sm:block max-w-sm font-light">
                        {collection.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 border border-[#FFFEF7]/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#FFFEF7] transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4 text-[#FFFEF7] group-hover:text-[#3C2415] transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="btn-luxury-outline"
          >
            View All 9 Collections →
          </Link>
        </div>
      </div>
    </section>
  );
}
