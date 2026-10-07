'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CalendarCheck, Phone, Mail, Clock, Check, ChevronRight } from 'lucide-react';
import { products } from '@/data/catalogue';

interface AppointmentItem {
  id: string;
  customer_name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  type: string;
  status: string;
  product_ids: string[];
}

const initialDemoAppointments: AppointmentItem[] = [
  {
    id: 'APT-1001',
    customer_name: 'Priya Bajpai',
    phone: '9839012345',
    email: 'priya.b@example.com',
    date: '2026-09-05',
    time: '11:00 AM – 1:00 PM',
    type: 'store-visit',
    status: 'confirmed',
    product_ids: ['LJ-101', 'LJ-103', 'LJ-104'],
  },
  {
    id: 'APT-1002',
    customer_name: 'Amit & Neha Verma',
    phone: '9415056789',
    date: '2026-09-06',
    time: '3:00 PM – 5:00 PM',
    type: 'ring-consultation',
    status: 'new',
    product_ids: ['LJ-102', 'LJ-111'],
  },
  {
    id: 'APT-1003',
    customer_name: 'Sunita Gupta',
    phone: '9792011223',
    date: '2026-09-07',
    time: '1:00 PM – 3:00 PM',
    type: 'bridal-consultation',
    status: 'contacted',
    product_ids: ['LJ-107', 'LJ-112'],
  },
];

const statusFlow = ['new', 'contacted', 'confirmed', 'visited', 'converted', 'closed'];

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>(initialDemoAppointments);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lata_admin_appointments');
      if (stored) {
        const parsed = JSON.parse(stored);
        setAppointments([...parsed, ...initialDemoAppointments]);
      }
    } catch {
      // Demo fallback
    }
  }, []);

  const updateStatus = (id: string, newStatus: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="font-serif-display text-2xl md:text-3xl text-[#3C2415]">
            Appointments CRM
          </h1>
          <p className="text-xs text-[#8B7D6B]">
            Clienteling pipeline for showroom visits and try-on requests
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-white border border-[#EDE5DC] rounded-full w-fit">
          {appointments.length} Total Bookings
        </span>
      </div>

      <div className="space-y-4">
        {appointments.map((apt) => {
          const selectedProducts = products.filter((p) =>
            apt.product_ids?.includes(p.id)
          );

          return (
            <div
              key={apt.id}
              className="bg-white p-6 border border-[#EDE5DC] rounded-sm shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE5DC] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-display text-lg text-[#3C2415]">
                      {apt.customer_name}
                    </h3>
                    <span className="text-[10px] font-mono bg-[#F5F0EB] px-2 py-0.5 rounded text-[#8B7D6B]">
                      {apt.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#8B7D6B] mt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#C9A94E]" /> {apt.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C9A94E]" /> {apt.date} ({apt.time})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8B7D6B]">Status:</span>
                  <select
                    value={apt.status}
                    onChange={(e) => updateStatus(apt.id, e.target.value)}
                    className="text-xs bg-[#F5F0EB] border border-[#EDE5DC] px-2.5 py-1 text-[#3C2415] rounded uppercase tracking-wider font-semibold focus:outline-none"
                  >
                    {statusFlow.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedProducts.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8B7D6B] font-semibold mb-2">
                    Designs Shortlisted for this Visit ({selectedProducts.length}):
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-2.5 p-2 bg-[#F5F0EB]/60 border border-[#EDE5DC] rounded-sm"
                      >
                        <div className="relative w-12 h-12 bg-white shrink-0 overflow-hidden rounded">
                          {p.images[0]?.url && (
                            <Image
                              src={p.images[0].url}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[11px] font-medium text-[#3C2415] truncate">
                            {p.name}
                          </p>
                          <p className="text-[10px] text-[#8B7D6B]">{p.sku}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
