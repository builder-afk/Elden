import Link from 'next/link';
import { Star, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { storeInfo } from '@/data/store';
import { collections } from '@/data/catalogue';

export function Footer() {
  return (
    <footer className="bg-[#3C2415] text-[#FFFEF7] border-t border-[#C9A94E]/20 pb-20 lg:pb-0">
      <div className="container-luxury pt-16 md:pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif-display text-2xl tracking-[0.04em] text-[#FFFEF7] block">
                Lata Jewellers
              </span>
              <span className="font-hindi text-xs text-[#C9A94E] tracking-wider block -mt-0.5">
                लता ज्वैलर्स
              </span>
            </Link>
            <p className="text-xs text-[#FFFEF7]/70 leading-relaxed max-w-sm font-light">
              Jewellery for generations. Crafting timeless 22K hallmarked gold, polki, and bridal
              creations for Kanpur families for over two decades.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#C9A94E] fill-[#C9A94E]" />
                ))}
              </div>
              <span className="text-xs text-[#FFFEF7]/90 font-medium">
                {storeInfo.googleRating} Google Rating ({storeInfo.googleReviews} Reviews)
              </span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[#C9A94E] font-medium mb-3">
              Explore
            </p>
            <ul className="space-y-2 text-xs text-[#FFFEF7]/75">
              <li><Link href="/collections" className="hover:text-white transition-colors">All Collections</Link></li>
              <li><Link href="/bridal" className="hover:text-white transition-colors">The Bridal Edit</Link></li>
              <li><Link href="/rings" className="hover:text-white transition-colors">Engagement & Rings</Link></li>
              <li><Link href="/occasions" className="hover:text-white transition-colors">Occasions</Link></li>
              <li><Link href="/find" className="hover:text-white transition-colors">Jewellery Finder</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">My Collection</Link></li>
            </ul>
          </div>

          {/* Collections (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[#C9A94E] font-medium mb-3">
              Collections
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-[#FFFEF7]/75">
              {collections.slice(0, 8).map((col) => (
                <li key={col.id}>
                  <Link href={`/collections/${col.slug}`} className="hover:text-white transition-colors">
                    {col.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom Visit (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[#C9A94E] font-medium mb-3">
              Showroom Visit
            </p>
            <div className="space-y-2.5 text-xs text-[#FFFEF7]/75">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A94E] shrink-0 mt-0.5" />
                <span>
                  {storeInfo.address.line1}, {storeInfo.address.line2}, {storeInfo.address.city}, Uttar Pradesh {storeInfo.address.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C9A94E] shrink-0" />
                <span>{storeInfo.hours.open} – {storeInfo.hours.close} ({storeInfo.hours.days})</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A94E] shrink-0" />
                <span>100% BIS Hallmarked Purity</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/appointments"
                className="inline-block btn-luxury bg-[#C9A94E] text-[#3C2415] text-[11px] py-2 px-4 hover:bg-[#B09240]"
              >
                Book Private Visit
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFFEF7]/50 gap-4">
          <p>© {new Date().getFullYear()} Lata Jewellers (लता ज्वैलर्स). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">About Heritage</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQs & Care</Link>
            <Link href="/admin" className="hover:text-[#C9A94E] transition-colors">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
