'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { createBridalEnquiry } from '@/lib/supabase/queries';
import { BridalConsultationRequest } from '@/types';

const jewelleryCategories = [
  'Bridal Choker / Necklace Set',
  'Polki & Kundan Sets',
  'Heritage Bangles / Kadas',
  'Chandbali / Jhumka Earrings',
  'Nath & Maang Tikka',
  'Diamond Solitaire Rings',
  'Full Bridal Trousseau',
];

const budgetOptions = [
  '₹1,50,000 – ₹3,00,000',
  '₹3,00,000 – ₹6,00,000',
  '₹6,00,000 – ₹10,00,000',
  '₹10,00,000+',
  'Flexible / Undecided',
];

export default function BridalConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    weddingDate: '',
    appointmentDate: '',
    preferredTime: '11:00 AM – 1:00 PM',
    jewelleryInterests: [] as string[],
    budgetRange: '',
    additionalRequirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleInterest = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      jewelleryInterests: prev.jewelleryInterests.includes(item)
        ? prev.jewelleryInterests.filter((i) => i !== item)
        : [...prev.jewelleryInterests, item],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createBridalEnquiry(formData as BridalConsultationRequest);
      setIsSubmitted(true);
    } catch {
      alert('Could not submit enquiry. Please call us or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="section-padding bg-[#FFFEF7] min-h-[80vh] flex items-center justify-center">
        <div className="container-luxury max-w-lg text-center bg-[#F5F0EB] p-8 md:p-12 border border-[#EDE5DC] rounded-sm">
          <CheckCircle2 className="w-12 h-12 text-[#C9A94E] mx-auto mb-4" />
          <h1 className="font-serif-display text-2xl md:text-3xl text-[#3C2415] mb-2">
            Consultation Request Received
          </h1>
          <p className="text-xs text-[#8B7D6B] leading-relaxed mb-6">
            Thank you, {formData.name}. Our master bridal consultant will contact you on{' '}
            <strong>{formData.phone}</strong> to confirm your private viewing at our Govind Nagar
            showroom.
          </p>
          <Link href="/bridal" className="btn-luxury-primary text-xs py-2.5">
            Back to Bridal Edit
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-[#FFFEF7] min-h-screen">
      <div className="container-luxury max-w-2xl mx-auto">
        <Link
          href="/bridal"
          className="inline-flex items-center gap-1.5 text-xs text-[#8B7D6B] hover:text-[#3C2415] mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Bridal Edit
        </Link>

        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C9A94E] font-medium block mb-2">
            VIP Bridal Consultation
          </span>
          <h1 className="heading-hero text-3xl md:text-4xl text-[#3C2415] mb-3">
            Plan Your Bridal Jewellery
          </h1>
          <p className="text-xs text-[#8B7D6B] max-w-md mx-auto leading-relaxed">
            Reserve dedicated private showroom time with our senior jewellery curators for a
            personalized trousseau matching session.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-[#F5F0EB]/60 p-6 md:p-10 border border-[#EDE5DC] rounded-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-2">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Priya Sharma"
                className="input-luxury bg-white px-3 py-2 border rounded-sm"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 98XXXXXXXX"
                className="input-luxury bg-white px-3 py-2 border rounded-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-2">
                Wedding Date (Optional)
              </label>
              <input
                type="date"
                value={formData.weddingDate}
                onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                className="input-luxury bg-white px-3 py-2 border rounded-sm text-xs"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-2">
                Preferred Visit Date *
              </label>
              <input
                type="date"
                required
                value={formData.appointmentDate}
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                className="input-luxury bg-white px-3 py-2 border rounded-sm text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-2">
              Preferred Time Slot
            </label>
            <select
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="input-luxury bg-white px-3 py-2 border rounded-sm text-xs"
            >
              <option value="11:00 AM – 1:00 PM">Morning (11:00 AM – 1:00 PM)</option>
              <option value="1:00 PM – 3:00 PM">Afternoon (1:00 PM – 3:00 PM)</option>
              <option value="3:00 PM – 5:00 PM">Evening (3:00 PM – 5:00 PM)</option>
              <option value="5:00 PM – 7:30 PM">Late Evening (5:00 PM – 7:30 PM)</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-3">
              Jewellery Categories of Interest
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {jewelleryCategories.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleInterest(item)}
                  className={`text-left p-3 text-xs border rounded-sm transition-all cursor-pointer ${
                    formData.jewelleryInterests.includes(item)
                      ? 'bg-[#722F37] text-white border-[#722F37]'
                      : 'bg-white text-[#3C2415] border-[#EDE5DC] hover:border-[#C9A94E]'
                  }`}
                >
                  {formData.jewelleryInterests.includes(item) ? '✓ ' : '+ '}
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-2">
              Estimated Budget Range
            </label>
            <select
              value={formData.budgetRange}
              onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
              className="input-luxury bg-white px-3 py-2 border rounded-sm text-xs"
            >
              <option value="">Select budget range...</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-[#3C2415] font-medium block mb-2">
              Additional Notes / Specific Design Wishes
            </label>
            <textarea
              rows={3}
              value={formData.additionalRequirements}
              onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
              placeholder="Tell us about your lehenga colours, necklines, or custom ideas..."
              className="input-luxury bg-white p-3 border rounded-sm text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-luxury-primary w-full justify-center py-3.5 text-xs shadow-md"
          >
            {isSubmitting ? 'Confirming...' : 'Request Private Bridal Consultation'}
          </button>
        </form>
      </div>
    </div>
  );
}
