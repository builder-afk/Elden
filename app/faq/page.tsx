'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Is all gold jewellery at Lata Jewellers BIS hallmarked?',
    a: 'Yes, 100% of our gold jewellery carries genuine BIS Hallmarking with HUID (Hallmark Unique Identification). We strictly adhere to Govt. of India purity standards for 22K (916) and 18K (750) jewellery.',
  },
  {
    q: 'Where is Lata Jewellers located in Kanpur?',
    a: 'We are situated at Shop No. 84, Vidyarthi Market, Govind Nagar, Kanpur, Uttar Pradesh 208006. We are centrally located in Vidyarthi Market with convenient market access.',
  },
  {
    q: 'What are the store timings?',
    a: 'We are open 7 days a week from 10:00 AM to 9:00 PM. You can walk in anytime or schedule an advance appointment for private bridal styling.',
  },
  {
    q: 'Can I customize bridal sets or make-to-order jewellery?',
    a: 'Absolutely. We specialize in bespoke bridal jewellery, custom solitaire engagement rings, and traditional heritage recreations. Bring your design references or collaborate with our master karigars.',
  },
  {
    q: 'Do you offer old gold exchange and valuation?',
    a: 'Yes, we provide transparent old gold testing and exchange based on current market rates with minimum deduction, verified using digital caratometer technology in front of you.',
  },
  {
    q: 'How can I save jewellery pieces I like on this website?',
    a: 'Simply click the heart icon on any design to save it to "My Collection". When you visit our showroom, you can show your shortlist to our staff or click "See These At The Store" to schedule a viewing.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="section-padding bg-[#FFFEF7] min-h-screen">
      <div className="container-luxury max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C9A94E] font-medium block mb-2">
            Questions & Answers
          </span>
          <h1 className="heading-hero text-3xl sm:text-4xl md:text-5xl text-[#3C2415] mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-[#8B7D6B] max-w-md mx-auto leading-relaxed">
            Everything you need to know about our purity standards, craftsmanship, and showroom visits.
          </p>
          <div className="line-gold mx-auto mt-6" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="border border-[#EDE5DC] bg-[#F5F0EB]/50 rounded-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5F0EB] transition-colors"
                >
                  <span className="font-serif-display text-base sm:text-lg text-[#3C2415]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#722F37] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#8B7D6B] leading-relaxed border-t border-[#EDE5DC]/60 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
