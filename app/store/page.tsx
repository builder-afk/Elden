import Link from 'next/link';
import { MapPin, Clock, Phone, Navigation, ShieldCheck, ShoppingBag, Car, CalendarCheck } from 'lucide-react';
import { storeInfo } from '@/data/store';

export default function StorePage() {
  return (
    <div className="bg-[#FFFEF7] min-h-screen">
      <div className="section-padding-sm bg-[#F5F0EB] border-b border-[#EDE5DC]">
        <div className="container-luxury text-center py-8">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C9A94E] font-medium block mb-2">
            Kanpur Showroom
          </span>
          <h1 className="heading-hero text-3xl sm:text-4xl md:text-5xl text-[#3C2415] mb-3">
            Visit Lata Jewellers
          </h1>
          <p className="font-hindi text-sm text-[#8B7D6B]">
            दुकान नं. ८४, विद्यार्थी मार्केट, गोविन्द नगर, कानपुर
          </p>
        </div>
      </div>

      <div className="section-padding bg-[#FFFEF7]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 bg-[#F5F0EB] border border-[#EDE5DC] rounded-sm space-y-4">
                <h2 className="heading-section text-xl text-[#3C2415]">Showroom Address</h2>
                <div className="flex items-start gap-3 text-xs text-[#3C2415]">
                  <MapPin className="w-5 h-5 text-[#722F37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{storeInfo.name} ({storeInfo.nameHindi})</p>
                    <p className="text-[#8B7D6B] mt-1 leading-relaxed">
                      {storeInfo.address.line1}, {storeInfo.address.line2}<br />
                      {storeInfo.address.city}, {storeInfo.address.state} — {storeInfo.address.pincode}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EDE5DC] flex gap-3">
                  <a
                    href="https://maps.google.com/?q=Lata+Jewellers+Govind+Nagar+Kanpur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury-primary text-xs py-2.5 px-4 flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Google Maps Directions
                  </a>
                  <Link
                    href="/appointments"
                    className="btn-luxury-outline text-xs py-2.5 px-4 flex items-center gap-1.5"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" /> Book Private Visit
                  </Link>
                </div>
              </div>

              <div className="p-6 bg-[#F5F0EB] border border-[#EDE5DC] rounded-sm space-y-4">
                <h2 className="heading-section text-xl text-[#3C2415]">Operating Hours</h2>
                <div className="flex items-start gap-3 text-xs text-[#3C2415]">
                  <Clock className="w-5 h-5 text-[#C9A94E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{storeInfo.hours.open} – {storeInfo.hours.close}</p>
                    <p className="text-[#8B7D6B] mt-0.5">{storeInfo.hours.days} (No weekly closing)</p>
                    <p className="text-[11px] text-[#722F37] mt-1 font-medium">Open until 9:00 PM every evening</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#F5F0EB] border border-[#EDE5DC] rounded-sm space-y-4">
                <h2 className="heading-section text-xl text-[#3C2415]">Showroom Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#3C2415]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C9A94E]" />
                    <span>Live Caratometer Purity Test</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#C9A94E]" />
                    <span>Private Bridal Viewing Lounge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#C9A94E]" />
                    <span>Easy Market Parking Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C9A94E]" />
                    <span>Card & UPI Payments Accepted</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-[#EDE5DC] shadow-md bg-[#EDE5DC]">
                <iframe
                  src={storeInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lata Jewellers Showroom Map"
                  className="w-full h-full"
                />
              </div>

              <div className="p-6 bg-[#3C2415] text-[#FFFEF7] rounded-sm text-xs space-y-3">
                <h3 className="font-serif-display text-lg text-[#C9A94E]">
                  Planning a Bridal or High-Value Purchase?
                </h3>
                <p className="text-white/70 leading-relaxed font-light">
                  We recommend reserving an appointment so our senior curators can set aside
                  exclusive bridal chokers, uncut polki sets, and matching bangles for your viewing.
                </p>
                <Link
                  href="/bridal/consultation"
                  className="inline-block btn-luxury bg-[#C9A94E] text-[#3C2415] text-xs py-2.5 px-4 hover:bg-[#B09240]"
                >
                  Schedule Bridal Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
