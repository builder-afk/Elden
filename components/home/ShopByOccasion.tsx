'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { occasions } from '@/data/catalogue';

export function ShopByOccasion() {
  return (
    <section className="section-padding bg-[#F5F0EB]" id="occasions">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="text-subtitle text-[#8B7D6B] mb-3">Milestones & Celebrations</p>
          <h2 className="heading-section text-3xl md:text-4xl lg:text-5xl text-[#3C2415]">
            Find Jewellery for
            <br className="hidden sm:block" />
            Your Moment
          </h2>
          <div className="line-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {occasions.map((occasion, index) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                href={`/collections?occasion=${occasion.slug}`}
                className="group relative flex flex-col justify-end aspect-[3/4] p-4 sm:p-5 bg-[#2D1810] overflow-hidden rounded-sm shadow-sm hover:shadow-md border border-[#EDE5DC] transition-all"
              >
                <Image
                  src={occasion.image}
                  alt={occasion.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08]/90 via-[#1A0E08]/30 to-transparent" />

                <div className="relative z-10 text-center">
                  <h3 className="font-serif-display text-base sm:text-lg text-[#FFFEF7] tracking-[0.02em] mb-1">
                    {occasion.name}
                  </h3>
                  <p className="text-[11px] text-[#C9A94E] uppercase tracking-wider font-medium">
                    Explore →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
