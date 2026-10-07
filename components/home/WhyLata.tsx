'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Gem, Sparkles, HeartHandshake, Users } from 'lucide-react';
import { brandPillars } from '@/data/store';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'shield-check': ShieldCheck,
  gem: Gem,
  sparkles: Sparkles,
  'heart-handshake': HeartHandshake,
  users: Users,
};

export function WhyLata() {
  return (
    <section className="section-padding bg-[#F5F0EB]" id="why-lata">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="text-subtitle text-[#8B7D6B] mb-3">Our Core Values</p>
          <h2 className="heading-section text-3xl md:text-4xl lg:text-5xl text-[#3C2415]">
            Why Lata Jewellers
          </h2>
          <p className="mt-3 text-sm text-[#8B7D6B] max-w-lg mx-auto">
            The values that have earned Kanpur&apos;s trust for over two decades.
          </p>
          <div className="line-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {brandPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon] || ShieldCheck;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#FFFEF7] p-6 sm:p-8 border border-[#EDE5DC] shadow-sm hover:border-[#C9A94E]/60 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-[#F5F0EB] group-hover:bg-[#F7E7CE] flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-5 h-5 text-[#C9A94E]" />
                </div>
                <h3 className="font-serif-display text-lg text-[#3C2415] mb-1">
                  {pillar.title}
                </h3>
                <span className="font-hindi text-xs text-[#8B7D6B] mb-3">
                  {pillar.titleHindi}
                </span>
                <p className="text-xs text-[#8B7D6B] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
