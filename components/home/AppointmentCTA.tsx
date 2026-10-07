'use client';

import Link from 'next/link';
import { CalendarCheck, ArrowRight } from 'lucide-react';

export function AppointmentCTA() {
  return (
    <section className="py-20 bg-[#722F37] text-[#FFFEF7] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at center, #C9A94E 0%, transparent 70%)`,
        }}
      />
      <div className="container-luxury relative z-10 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A94E] font-medium block mb-2">
          Private Showroom Visit
        </span>
        <h2 className="heading-hero text-3xl sm:text-4xl md:text-5xl text-[#FFFEF7] mb-4">
          Experience Fine Jewellery In Person
        </h2>
        <p className="text-sm text-[#FFFEF7]/80 leading-relaxed font-light mb-8">
          Whether selecting an engagement ring or planning a wedding trousseau, schedule
          a visit so our specialists can prepare your shortlisted pieces ahead of your arrival.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/appointments"
            className="btn-luxury bg-[#FFFEF7] text-[#3C2415] hover:bg-[#F7E7CE] shadow-lg flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-4 h-4 text-[#722F37]" />
            Book Store Visit
          </Link>
          <Link
            href="/bridal/consultation"
            className="btn-luxury border border-white/30 text-[#FFFEF7] hover:bg-white/10 flex items-center justify-center gap-2"
          >
            Bridal Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
