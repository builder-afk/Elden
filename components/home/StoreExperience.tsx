'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { storeInfo } from '@/data/store';

export function StoreExperience() {
  return (
    <section className="section-padding bg-[#FFFEF7]" id="store">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-subtitle text-[#8B7D6B] mb-2">Showroom Location</p>
              <h2 className="heading-section text-3xl sm:text-4xl text-[#3C2415]">
                Visit Our Showroom in Govind Nagar
              </h2>
            </div>

            <p className="text-sm text-[#8B7D6B] leading-relaxed font-light">
              We welcome you to experience our jewellery collections in person. Our experienced
              team is here to guide you with personal attention, transparent gold purity testing,
              and bespoke bridal styling.
            </p>

            <div className="space-y-4 pt-2 text-xs text-[#3C2415]">
              <div className="flex items-start gap-3 p-4 bg-[#F5F0EB]/60 border border-[#EDE5DC] rounded-sm">
                <MapPin className="w-5 h-5 text-[#722F37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Showroom Address</h4>
                  <p className="text-[#8B7D6B] leading-relaxed">
                    {storeInfo.address.line1}, {storeInfo.address.line2}, {storeInfo.address.city},
                    Uttar Pradesh {storeInfo.address.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#F5F0EB]/60 border border-[#EDE5DC] rounded-sm">
                <Clock className="w-5 h-5 text-[#C9A94E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Showroom Hours</h4>
                  <p className="text-[#8B7D6B]">
                    {storeInfo.hours.open} – {storeInfo.hours.close} ({storeInfo.hours.days})
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://maps.google.com/?q=Lata+Jewellers+Govind+Nagar+Kanpur"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury bg-[#722F37] text-[#FFFEF7] text-xs py-3 px-5 hover:bg-[#5A1E25] flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" /> Get Directions via Google Maps
              </a>
              <Link
                href="/appointments"
                className="btn-luxury-outline text-xs py-3 px-5"
              >
                Book Personal Visit
              </Link>
            </div>
          </div>

          {/* Right Map (6 cols) */}
          <div className="lg:col-span-6 relative aspect-video lg:aspect-[4/3] rounded-sm overflow-hidden border border-[#EDE5DC] shadow-md bg-[#EDE5DC]">
            <iframe
              src={storeInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lata Jewellers Store Location"
              className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
