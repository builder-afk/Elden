'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeritageSection() {
  return (
    <section className="section-padding bg-[#FFFEF7] border-t border-b border-[#EDE5DC]">
      <div className="container-luxury">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4 text-[#C9A94E]" />
            <p className="text-subtitle text-[#C9A94E] tracking-[0.2em]">
              Heritage & Craftsmanship
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-section text-3xl sm:text-4xl md:text-5xl text-[#3C2415] mb-6"
          >
            The Jeweller Your Family Returns To
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-[#8B7D6B] leading-relaxed mb-8 font-light"
          >
            In Govind Nagar, jewellery is never just an ornament — it is a blessing passed
            from mothers to daughters, an heirloom celebrating weddings, and an investment in family
            prosperity. Since our founding at Shop No. 84, Vidyarthi Market, Lata Jewellers has stood
            as a beacon of 100% verified purity, genuine weight measurement, and transparent pricing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/about" className="btn-luxury-primary text-xs py-3">
              Read Our Story <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/store" className="btn-luxury-outline text-xs py-3">
              Locate Showroom
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
