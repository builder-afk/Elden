'use client';

import { useState, useEffect } from 'react';
import { HeartHandshake, Phone, Calendar, Clock, DollarSign } from 'lucide-react';

interface BridalItem {
  id: string;
  name: string;
  phone: string;
  wedding_date?: string;
  appointment_date: string;
  preferred_time: string;
  jewellery_interests: string[];
  budget_range?: string;
  additional_requirements?: string;
  status: string;
}

const initialDemoBridal: BridalItem[] = [
  {
    id: 'BRD-101',
    name: 'Simran Awasthi',
    phone: '9838012345',
    wedding_date: '2026-12-14',
    appointment_date: '2026-09-08',
    preferred_time: '11:00 AM – 1:00 PM',
    jewellery_interests: ['Bridal Choker / Necklace Set', 'Polki & Kundan Sets', 'Heritage Bangles / Kadas'],
    budget_range: '₹6,00,000 – ₹10,00,000',
    additional_requirements: 'Looking for a royal green meenakari choker matching red wedding lehenga.',
    status: 'new',
  },
  {
    id: 'BRD-102',
    name: 'Kavita Mehrotra',
    phone: '9450011223',
    wedding_date: '2027-01-20',
    appointment_date: '2026-09-10',
    preferred_time: '3:00 PM – 5:00 PM',
    jewellery_interests: ['Full Bridal Trousseau', 'Diamond Solitaire Rings'],
    budget_range: '₹10,00,000+',
    status: 'contacted',
  },
];

export default function AdminBridalPage() {
  const [enquiries, setEnquiries] = useState<BridalItem[]>(initialDemoBridal);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lata_admin_bridal');
      if (stored) {
        const parsed = JSON.parse(stored);
        setEnquiries([...parsed, ...initialDemoBridal]);
      }
    } catch {
      // Demo fallback
    }
  }, []);

  const updateStatus = (id: string, newStatus: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="font-serif-display text-2xl md:text-3xl text-[#3C2415]">
            Bridal Consultation Enquiries
          </h1>
          <p className="text-xs text-[#8B7D6B]">
            High-value bridal trousseau and wedding jewellery requests
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-white border border-[#EDE5DC] rounded-full w-fit">
          {enquiries.length} Bridal Clients
        </span>
      </div>

      <div className="space-y-4">
        {enquiries.map((b) => (
          <div
            key={b.id}
            className="bg-white p-6 border border-[#EDE5DC] rounded-sm shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE5DC] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-display text-lg text-[#3C2415]">{b.name}</h3>
                  <span className="text-[10px] font-mono bg-[#F5F0EB] px-2 py-0.5 rounded text-[#8B7D6B]">
                    {b.id}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#8B7D6B] mt-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#C9A94E]" /> {b.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C9A94E]" /> Visit: {b.appointment_date} ({b.preferred_time})
                  </span>
                  {b.wedding_date && (
                    <span className="text-[#722F37] font-medium">
                      Wedding: {b.wedding_date}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8B7D6B]">Status:</span>
                <select
                  value={b.status}
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                  className="text-xs bg-[#F5F0EB] border border-[#EDE5DC] px-2.5 py-1 text-[#3C2415] rounded uppercase tracking-wider font-semibold focus:outline-none"
                >
                  {['new', 'contacted', 'confirmed', 'visited', 'converted', 'closed'].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[#8B7D6B] uppercase tracking-wider text-[10px] font-semibold mb-1">
                  Categories of Interest:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {b.jewellery_interests?.map((interest) => (
                    <span
                      key={interest}
                      className="px-2.5 py-0.5 bg-[#F5F0EB] text-[#722F37] rounded text-[11px]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {b.budget_range && (
                <div>
                  <p className="text-[#8B7D6B] uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Estimated Budget:
                  </p>
                  <p className="font-semibold text-sm text-[#3C2415]">{b.budget_range}</p>
                </div>
              )}
            </div>

            {b.additional_requirements && (
              <div className="p-3 bg-[#F5F0EB]/60 rounded text-xs text-[#3C2415] border border-[#EDE5DC]">
                <span className="font-semibold text-[#8B7D6B] block mb-0.5">Custom Notes:</span>
                <p>{b.additional_requirements}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
