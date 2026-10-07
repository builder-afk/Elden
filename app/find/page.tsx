'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { products } from '@/data/catalogue';
import { ProductCard } from '@/components/products/ProductCard';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { Product } from '@/types';

const steps = [
  {
    id: 'shoppingFor',
    question: 'Who are you shopping for?',
    options: ['Self', 'Bride', 'Groom', 'Partner', 'Family', 'Gift'],
  },
  {
    id: 'occasion',
    question: "What's the occasion?",
    options: ['Wedding', 'Engagement', 'Anniversary', 'Festival', 'Everyday', 'Gift'],
  },
  {
    id: 'jewelleryType',
    question: 'What type of jewellery?',
    options: ['Rings', 'Necklaces', 'Earrings', 'Bangles', 'Bracelets', 'Pendants', 'Chains', 'Any'],
  },
  {
    id: 'style',
    question: 'What style do you prefer?',
    options: ['Traditional', 'Contemporary', 'Minimal', 'Statement'],
  },
];

export default function JewelleryFinderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleSelect = (value: string) => {
    const stepId = steps[currentStep].id;
    const newSelections = { ...selections, [stepId]: value };
    setSelections(newSelections);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setSelections({});
    setShowResults(false);
  };

  const filteredProducts = products.filter((p) => {
    if (selections.occasion) {
      const occasionMap: Record<string, string> = {
        Wedding: 'wedding',
        Engagement: 'engagement',
        Anniversary: 'anniversary',
        Festival: 'festive',
        Everyday: 'everyday',
        Gift: 'gifting',
      };
      const mapped = occasionMap[selections.occasion];
      if (mapped && p.occasion && !p.occasion.includes(mapped)) return false;
    }
    if (selections.jewelleryType && selections.jewelleryType !== 'Any') {
      const isMatch =
        p.category.toLowerCase().includes(selections.jewelleryType.toLowerCase()) ||
        p.collection.toLowerCase().includes(selections.jewelleryType.toLowerCase());
      if (!isMatch) return false;
    }
    if (selections.style) {
      if (p.style && p.style.toLowerCase() !== selections.style.toLowerCase()) return false;
    }
    return true;
  });

  if (showResults) {
    return (
      <div className="section-padding bg-[#FFFEF7] min-h-screen">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <h1 className="heading-section text-3xl md:text-4xl text-[#3C2415] mb-2">
              Your Curated Matches
            </h1>
            <p className="text-xs text-[#8B7D6B]">
              {filteredProducts.length} handcrafted design{filteredProducts.length !== 1 ? 's' : ''} matched based on your preferences
            </p>
            <button
              onClick={reset}
              className="mt-3 text-xs text-[#722F37] tracking-widest uppercase border-b border-[#722F37]/30 pb-0.5 hover:text-[#5A1E25] cursor-pointer"
            >
              Start Over ↺
            </button>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#F5F0EB]/60 border border-[#EDE5DC] p-8 max-w-md mx-auto">
              <p className="text-xs text-[#8B7D6B] mb-6 leading-relaxed">
                No exact match found for this particular combination, but our showroom specialists
                can craft custom pieces tailored to your exact taste.
              </p>
              <Link href="/collections" className="btn-luxury-primary text-xs py-2.5">
                Browse All Collections
              </Link>
            </div>
          )}
        </div>

        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center section-padding bg-[#FFFEF7]">
      <div className="container-luxury max-w-xl mx-auto">
        <div className="text-center mb-12">
          <Sparkles className="w-8 h-8 text-[#C9A94E] mx-auto mb-3" />
          <h1 className="heading-hero text-3xl md:text-4xl text-[#3C2415]">
            Find Your
            <br />
            Perfect Piece
          </h1>
          <div className="line-gold mx-auto mt-6" />
        </div>

        <div className="flex items-center gap-1 mb-10 max-w-xs mx-auto">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-0.5 transition-colors ${
                i <= currentStep ? 'bg-[#C9A94E]' : 'bg-[#EDE5DC]'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="heading-editorial text-2xl md:text-3xl text-[#3C2415] text-center mb-8">
              {steps[currentStep].question}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {steps[currentStep].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="p-4 bg-[#FFFEF7] border border-[#EDE5DC] hover:border-[#C9A94E] hover:bg-[#F7E7CE]/40 text-xs tracking-[0.06em] text-[#3C2415] transition-all text-center rounded-sm shadow-sm cursor-pointer"
                >
                  {option}
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-xs text-[#8B7D6B] hover:text-[#3C2415] mt-6 mx-auto transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
