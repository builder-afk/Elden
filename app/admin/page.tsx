'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  HeartHandshake,
  Gem,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { products } from '@/data/catalogue';

export default function AdminOverviewPage() {
  const [appointmentsCount, setAppointmentsCount] = useState(3);
  const [bridalCount, setBridalCount] = useState(2);

  useEffect(() => {
    try {
      const apt = JSON.parse(localStorage.getItem('lata_admin_appointments') || '[]');
      if (apt.length > 0) setAppointmentsCount(apt.length + 3);
      const brd = JSON.parse(localStorage.getItem('lata_admin_bridal') || '[]');
      if (brd.length > 0) setBridalCount(brd.length + 2);
    } catch {
      // Local demo fallback
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-widest text-[#722F37] font-semibold block mb-1">
          Govind Nagar, Kanpur Branch
        </span>
        <h1 className="font-serif-display text-3xl text-[#3C2415]">Showroom Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white border border-[#EDE5DC] rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8B7D6B] uppercase tracking-wider">Active Visits</span>
            <CalendarCheck className="w-5 h-5 text-[#722F37]" />
          </div>
          <p className="font-serif-display text-3xl font-bold text-[#3C2415]">{appointmentsCount}</p>
          <span className="text-[11px] text-[#8B7D6B]">Upcoming bookings</span>
        </div>

        <div className="p-6 bg-white border border-[#EDE5DC] rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8B7D6B] uppercase tracking-wider">Bridal Enquiries</span>
            <HeartHandshake className="w-5 h-5 text-[#C9A94E]" />
          </div>
          <p className="font-serif-display text-3xl font-bold text-[#3C2415]">{bridalCount}</p>
          <span className="text-[11px] text-[#8B7D6B]">Trousseau requests</span>
        </div>

        <div className="p-6 bg-white border border-[#EDE5DC] rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8B7D6B] uppercase tracking-wider">Live Inventory</span>
            <Gem className="w-5 h-5 text-[#3C2415]" />
          </div>
          <p className="font-serif-display text-3xl font-bold text-[#3C2415]">{products.length}</p>
          <span className="text-[11px] text-[#8B7D6B]">Catalogue designs</span>
        </div>

        <div className="p-6 bg-white border border-[#EDE5DC] rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8B7D6B] uppercase tracking-wider">Client Trust</span>
            <ShieldCheck className="w-5 h-5 text-[#25D366]" />
          </div>
          <p className="font-serif-display text-3xl font-bold text-[#3C2415]">4.9 ★</p>
          <span className="text-[11px] text-[#8B7D6B]">127 Verified Google Reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-[#EDE5DC] rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif-display text-lg text-[#3C2415]">Recent Appointments</h2>
            <Link href="/admin/appointments" className="text-xs text-[#722F37] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#F5F0EB] rounded-sm flex justify-between items-center">
              <div>
                <p className="font-semibold text-[#3C2415]">Priya Bajpai</p>
                <p className="text-[#8B7D6B]">Store Visit · Trying 3 Saved Pieces</p>
              </div>
              <span className="px-2 py-0.5 bg-[#722F37] text-white text-[10px] rounded">Confirmed</span>
            </div>
            <div className="p-3 bg-[#F5F0EB] rounded-sm flex justify-between items-center">
              <div>
                <p className="font-semibold text-[#3C2415]">Amit & Neha Verma</p>
                <p className="text-[#8B7D6B]">Engagement Ring Consultation</p>
              </div>
              <span className="px-2 py-0.5 bg-[#C9A94E] text-[#3C2415] text-[10px] rounded">New</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-[#EDE5DC] rounded-sm shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif-display text-lg text-[#3C2415]">Bridal Consultations</h2>
            <Link href="/admin/bridal" className="text-xs text-[#722F37] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#F5F0EB] rounded-sm flex justify-between items-center">
              <div>
                <p className="font-semibold text-[#3C2415]">Simran Awasthi</p>
                <p className="text-[#8B7D6B]">Wedding in Dec 2026 · Full Trousseau</p>
              </div>
              <span className="px-2 py-0.5 bg-[#C9A94E] text-[#3C2415] text-[10px] rounded">VIP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
