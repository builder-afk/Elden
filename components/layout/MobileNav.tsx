'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, MapPin, Sparkles } from 'lucide-react';
import { useWishlist } from '@/components/wishlist/WishlistProvider';

export function MobileNav() {
  const pathname = usePathname();
  const { count } = useWishlist();

  // Don't show bottom nav on admin or dashboard routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) return null;

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Collections', href: '/collections', icon: Compass },
    { label: 'Rings', href: '/rings', icon: Sparkles },
    { label: 'Saved', href: '/wishlist', icon: Heart, badge: count },
    { label: 'Store', href: '/store', icon: MapPin },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFEF7]/95 backdrop-blur-md border-t border-[#EDE5DC] shadow-lg"
      aria-label="Mobile Navigation Bar"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
                isActive ? 'text-[#722F37]' : 'text-[#3C2415]/60 hover:text-[#3C2415]'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#722F37] text-[#FFFEF7] text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-wider uppercase mt-1 font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
