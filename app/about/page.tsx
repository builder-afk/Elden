import Link from 'next/link';
import Image from 'next/image';
import { Star, ShieldCheck, HeartHandshake, MapPin, Award } from 'lucide-react';
import { storeInfo, brandPillars } from '@/data/store';

export default function AboutPage() {
  return (
    <div className="bg-[#FFFEF7]">
      <section className="relative min-h-[50vh] flex items-end justify-center overflow-hidden bg-[#2D1810]">
        <div className="absolute inset-0">
          <Image
            src="/images/collections/traditional.jpg"
            alt="Lata Jewellers Heritage"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1810] via-[#2D1810]/70 to-transparent" />
        </div>

        <div className="relative z-10 container-luxury text-center py-20">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C9A94E] font-medium block mb-2">
            Our Story & Heritage
          </span>
          <h1 className="heading-hero text-4xl sm:text-5xl text-[#FFFEF7] mb-4">
            Jewellers for Generations
          </h1>
          <p className="text-sm text-[#FFFEF7]/80 max-w-lg mx-auto font-light">
            Founded in Govind Nagar, Kanpur with a singular devotion: to preserve genuine Indian
            jewellery craft while offering uncompromised honesty and transparency to our families.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#FFFEF7]">
        <div className="container-luxury max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <span className="text-xs uppercase tracking-[0.16em] text-[#722F37] font-semibold block mb-2">
                Established Trust
              </span>
              <h2 className="heading-section text-2xl sm:text-3xl text-[#3C2415] mb-4">
                Shop No. 84, Vidyarthi Market
              </h2>
              <p className="text-xs text-[#8B7D6B] leading-relaxed mb-4">
                Located in the heart of Govind Nagar, Lata Jewellers has grown from a humble family
                jewellery counter into one of Kanpur&apos;s most respected destinations for 22K hallmarked
                gold, Polki uncut diamonds, and bespoke bridal sets.
              </p>
              <p className="text-xs text-[#8B7D6B] leading-relaxed">
                What sets us apart is not just the beauty of our jewellery, but the trust we maintain.
                Every piece is weighed transparently in front of you, with purity certified and making
                charges explained without ambiguity.
              </p>
            </div>

            <div className="p-8 bg-[#F5F0EB] border border-[#EDE5DC] rounded-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A94E]/20 flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 text-[#C9A94E] fill-[#C9A94E]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#3C2415]">4.9 / 5.0 Rating</h3>
                  <p className="text-xs text-[#8B7D6B]">127+ verified reviews on Google</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#722F37]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#722F37]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#3C2415]">100% BIS Hallmarked</h3>
                  <p className="text-xs text-[#8B7D6B]">Govt. certified purity standard</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#3C2415]/10 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-6 h-6 text-[#3C2415]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#3C2415]">3 Generations</h3>
                  <p className="text-xs text-[#8B7D6B]">Of family patrons returning to us</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#EDE5DC] pt-16">
            <h3 className="heading-section text-2xl text-center text-[#3C2415] mb-12">
              Our Guiding Principles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {brandPillars.slice(0, 3).map((bp) => (
                <div key={bp.title} className="p-6 bg-[#F5F0EB]/60 border border-[#EDE5DC] rounded-sm">
                  <h4 className="font-serif-display text-lg text-[#3C2415] mb-1">{bp.title}</h4>
                  <span className="font-hindi text-xs text-[#8B7D6B] block mb-2">{bp.titleHindi}</span>
                  <p className="text-xs text-[#8B7D6B] leading-relaxed">{bp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#3C2415] text-[#FFFEF7] text-center">
        <div className="container-luxury">
          <h2 className="heading-section text-2xl md:text-3xl text-white mb-4">
            We Look Forward to Welcoming You
          </h2>
          <p className="text-xs text-white/70 max-w-md mx-auto mb-8">
            Experience our personal service firsthand. Visit us at Vidyarthi Market, Govind Nagar, Kanpur.
          </p>
          <Link href="/store" className="btn-luxury bg-[#C9A94E] text-[#3C2415] hover:bg-[#B09240]">
            Showroom Directions & Hours
          </Link>
        </div>
      </section>
    </div>
  );
}
