'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#3C2415] text-[#FFFEF7] text-[11px] tracking-[0.14em] uppercase py-2 px-4 relative z-50 border-b border-[#C9A94E]/20">
      <div className="container-luxury flex items-center justify-between text-center">
        <div className="w-full flex items-center justify-center gap-2">
          <span>VISIT OUR SHOWROOM — SHOP NO. 84, VIDYARTHI MARKET, GOVIND NAGAR, KANPUR · OPEN TILL 9 PM</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white transition-colors p-1 -mr-2"
          aria-label="Close announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
