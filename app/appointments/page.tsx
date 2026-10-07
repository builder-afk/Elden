'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CalendarCheck, CheckCircle2, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useWishlist } from '@/components/wishlist/WishlistProvider';
import { products } from '@/data/catalogue';
import { storeInfo } from '@/data/store';
import { createAppointment } from '@/lib/supabase/queries';
import { AppointmentRequest } from '@/types';

function AppointmentForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const productName = searchParams.get('productName');
  const initialType = (searchParams.get('type') as any) || 'store-visit';
  const withSaved = searchParams.get('withSaved') === 'true';

  const { items } = useWishlist();

  const savedProducts = products.filter((p) =>
    items.some((item) => item.productId === p.id)
  );

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '11:00 AM – 1:00 PM',
    type: initialType,
    notes: productId
      ? `Interested in trying: ${productName || productId}`
      : withSaved
      ? `Interested in trying ${savedProducts.length} pieces from saved collection`
      : '',
    productIds: productId ? [productId] : withSaved ? savedProducts.map((p) => p.id) : [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createAppointment(formData as AppointmentRequest);
      setIsSubmitted(true);
    } catch {
      alert('Could not submit appointment request. Please contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="section-padding bg-[#FFFEF7] min-h-[70vh] flex items-center justify-center">
        <div className="container-luxury max-w-lg text-center bg-[#F5F0EB] p-8 md:p-12 border border-[#EDE5DC] rounded-sm">
          <CheckCircle2 className="w-12 h-12 text-[#C9A94E] mx-auto mb-4" />
          <h1 className="font-serif-display text-2xl md:text-3xl text-[#3C2415] mb-2">
            Appointment Requested
          </h1>
          <p className="text-xs text-[#8B7D6B] leading-relaxed mb-6">
            Thank you, {formData.name}. Our showroom staff will contact you at{' '}
            <strong>{formData.phone}</strong> to confirm your appointment for{' '}
            <strong>{formData.date}</strong> ({formData.time}).
          </p>
          <div className="text-xs text-[#3C2415] p-4 bg-white border border-[#EDE5DC] mb-6 rounded-sm text-left">
            <p className="font-semibold mb-1">Showroom Address:</p>
            <p className="text-[#8B7D6B]">
              {storeInfo.address.line1}, {storeInfo.address.line2}, {storeInfo.address.city}, Uttar Pradesh {storeInfo.address.pincode}
            </p>
          </div>
          <Link href="/" className="btn-luxury-primary text-xs py-2.5">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-[#FFFEF7] min-h-screen">
      <div className="container-luxury max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C9A94E] font-medium block mb-2">
            Showroom Experience
          </span>
          <h1 className="heading-hero text-3xl md:text-4xl text-[#3C2415] mb-3">
            Book a Store Visit
          </h1>
          <p className="text-xs text-[#8B7D6B] max-w-md mx-auto leading-relaxed">
            Schedule a private viewing at Shop No. 84, Vidyarthi Market, Govind Nagar. We&apos;ll
            have your selected pieces ready for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6 bg-[#F5F0EB]/60 p-6 sm:p-8 border border-[#EDE5DC] rounded-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="input-luxury bg-white px-3 py-2 border rounded-sm text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="input-luxury bg-white px-3 py-2 border rounded-sm text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="input-luxury bg-white px-3 py-2 border rounded-sm text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-1.5">
                    Preferred Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="input-luxury bg-white px-3 py-2 border rounded-sm text-xs"
                  >
                    <option value="11:00 AM – 1:00 PM">11:00 AM – 1:00 PM</option>
                    <option value="1:00 PM – 3:00 PM">1:00 PM – 3:00 PM</option>
                    <option value="3:00 PM – 5:00 PM">3:00 PM – 5:00 PM</option>
                    <option value="5:00 PM – 7:00 PM">5:00 PM – 7:00 PM</option>
                    <option value="7:00 PM – 8:30 PM">7:00 PM – 8:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-1.5">
                  Visit Purpose / Consultation Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="input-luxury bg-white px-3 py-2 border rounded-sm text-xs"
                >
                  <option value="store-visit">General Store Visit</option>
                  <option value="bridal-consultation">Bridal Jewellery Consultation</option>
                  <option value="ring-consultation">Engagement & Ring Trial</option>
                  <option value="general">Custom Design Consultation</option>
                </select>
              </div>

              {savedProducts.length > 0 && (
                <div className="p-3 bg-white border border-[#EDE5DC] rounded-sm">
                  <span className="text-[11px] font-semibold text-[#3C2415] block mb-1">
                    Shortlisted Designs ({savedProducts.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {savedProducts.map((p) => (
                      <span key={p.id} className="text-[10px] bg-[#F5F0EB] px-2 py-0.5 rounded text-[#722F37]">
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-1.5">
                  Notes or Specific Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any particular design codes or questions..."
                  className="input-luxury bg-white p-3 border rounded-sm text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury-primary w-full justify-center py-3 text-xs shadow-sm"
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Appointment Request'}
              </button>
            </form>
          </div>

          <div className="md:col-span-4 space-y-4">
            <div className="p-5 bg-[#F5F0EB] border border-[#EDE5DC] rounded-sm space-y-4 text-xs">
              <h3 className="font-serif-display text-base text-[#3C2415]">Showroom Details</h3>
              <div className="space-y-3 text-[#8B7D6B]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#722F37] shrink-0 mt-0.5" />
                  <span>
                    {storeInfo.address.line1}, {storeInfo.address.line2}, {storeInfo.address.city}, UP {storeInfo.address.pincode}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C9A94E] shrink-0" />
                  <span>{storeInfo.hours.open} – {storeInfo.hours.close} (Daily)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C9A94E] shrink-0" />
                  <span>100% Hallmarked 22K/18K Gold</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#3C2415] text-[#FFFEF7] rounded-sm text-xs space-y-2">
              <p className="font-semibold text-[#C9A94E]">No Obligation Trial</p>
              <p className="text-white/70 leading-relaxed font-light">
                Feel free to try on as many pieces as you like. We believe in building lifelong
                trust with every family that walks in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={<div className="section-padding text-center">Loading booking form...</div>}>
      <AppointmentForm />
    </Suspense>
  );
}
