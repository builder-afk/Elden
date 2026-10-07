'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

const bridalCategories = [
  'Bridal Necklaces',
  'Bridal Sets',
  'Temple Bangles',
  'Polki Chandbali',
  'Solitaire Rings',
  'Wedding Collections',
];

export function BridalEdit() {
  return (
    <section className="relative overflow-hidden bg-[#5A1E25]" id="bridal">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 80% 50%, rgba(201, 169, 78, 0.15) 0%, transparent 60%),
              linear-gradient(160deg, #722F37 0%, #5A1E25 40%, #3C1520 100%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 mb-3"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C9A94E]" />
                <p className="text-subtitle text-[#C9A94E] tracking-[0.2em]">
                  The Bridal Edit · दुल्हन के लिए
                </p>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="heading-hero text-4xl sm:text-5xl lg:text-6xl text-[#FFFEF7] mb-6"
              >
                The Bridal
                <br />
                Experience
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#FFFEF7]/80 text-base md:text-lg leading-relaxed max-w-lg mb-8 font-light"
              >
                Your wedding day deserves jewellery that captures the grandeur of your heritage.
                Explore handcrafted Kundan, Polki, and 22K temple gold sets curated for the Kanpur bride.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-2 mb-10"
              >
                {bridalCategories.map((cat) => (
                  <Link
                    key={cat}
                    href="/bridal"
                    className="px-3.5 py-1.5 text-xs tracking-[0.08em] uppercase text-[#FFFEF7]/80 bg-black/20 border border-white/15 hover:border-[#C9A94E] hover:text-[#C9A94E] transition-all backdrop-blur-sm"
                  >
                    {cat}
                  </Link>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/bridal"
                  className="btn-luxury bg-[#C9A94E] text-[#3C2415] hover:bg-[#D4BA6A] group shadow-md"
                >
                  Explore Bridal Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/bridal/consultation"
                  className="btn-luxury border border-[#FFFEF7]/30 text-[#FFFEF7] hover:bg-[#FFFEF7]/10 backdrop-blur-sm"
                >
                  Book Bridal Consultation
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border border-[#C9A94E]/30"
            >
              <Image
                src="/images/hero/bridal-hero.jpg"
                alt="Lata Jewellers Royal Bridal Choker and Earrings Set"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#FFFEF7]">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#C9A94E]">
                    Handcrafted Heritage
                  </p>
                  <p className="font-serif-display text-xl">Kundan & Polki Bridal Sets</p>
                </div>
                <Link
                  href="/bridal"
                  className="p-3 bg-[#C9A94E] text-[#3C2415] hover:bg-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
