'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Calculator,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Gem,
  Scale,
} from 'lucide-react';

const METAL_RATES: Record<string, number> = {
  '22K Gold (916)': 7930,
  '18K Yellow Gold (750)': 6490,
  '18K Rose Gold (750)': 6490,
  '14K Gold (585)': 5050,
  '925 Sterling Silver': 98.5,
  'Platinum (950)': 4200,
};

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [nameHindi, setNameHindi] = useState('');
  const [category, setCategory] = useState('necklaces');
  const [collection, setCollection] = useState('bridal-jewellery');
  const [description, setDescription] = useState('');
  const [metal, setMetal] = useState('22K Gold (916)');
  const [purity, setPurity] = useState('22K (916 Hallmarked)');
  const [grossWeight, setGrossWeight] = useState('35.0');
  const [netWeight, setNetWeight] = useState('32.0');
  const [makingChargePerGram, setMakingChargePerGram] = useState('650');
  const [stoneType, setStoneType] = useState('Uncut Polki & Zambian Emeralds');
  const [stoneValue, setStoneValue] = useState('45000');
  const [availability, setAvailability] = useState<'in-stock' | 'made-to-order'>('in-stock');
  const [inventoryCount, setInventoryCount] = useState('3');
  const [leadDays, setLeadDays] = useState('14');
  const [hallmarkHuid, setHallmarkHuid] = useState('HUID-916-LATA-8921');
  const [style, setStyle] = useState('traditional');
  const [manualPriceOverride, setManualPriceOverride] = useState('');

  // Live Auto-Calculation Breakdown
  const ratePerGram = METAL_RATES[metal] || 7930;
  const netWeightNum = parseFloat(netWeight) || 0;
  const grossWeightNum = parseFloat(grossWeight) || 0;
  const makingChargeRate = parseFloat(makingChargePerGram) || 0;
  const stoneCost = parseFloat(stoneValue) || 0;

  const baseGoldValue = useMemo(() => {
    return Math.round(netWeightNum * ratePerGram);
  }, [netWeightNum, ratePerGram]);

  const totalMakingCharges = useMemo(() => {
    return Math.round(grossWeightNum * makingChargeRate);
  }, [grossWeightNum, makingChargeRate]);

  const subtotalBeforeTax = useMemo(() => {
    return baseGoldValue + totalMakingCharges + stoneCost;
  }, [baseGoldValue, totalMakingCharges, stoneCost]);

  const gstAmount = useMemo(() => {
    return Math.round(subtotalBeforeTax * 0.03); // 3% GST on jewellery in India
  }, [subtotalBeforeTax]);

  const calculatedTotalPrice = useMemo(() => {
    return subtotalBeforeTax + gstAmount;
  }, [subtotalBeforeTax, gstAmount]);

  const finalPrice = manualPriceOverride ? parseInt(manualPriceOverride) : calculatedTotalPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => {
        router.push('/dashboard/products');
      }, 1500);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back button & Header */}
      <div>
        <Link
          href="/dashboard/products"
          className="inline-flex items-center gap-1.5 text-xs text-[#8B7D6B] hover:text-[#722F37] mb-3 transition-colors uppercase tracking-wider font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inventory</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-serif-display text-2xl md:text-3xl text-[#3C2415]">
              Add New Jewellery Listing
            </h1>
            <p className="text-xs md:text-sm text-[#8B7D6B] mt-0.5">
              Enter physical specifications, metal weight, stones, and compute transparent Indian pricing.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#EDE5DC] px-3 py-1.5 rounded text-xs text-[#3C2415]">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span className="font-medium">BIS Hallmarked Seller</span>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold">Jewellery Piece Listed Successfully!</p>
            <p className="text-xs">Your new piece is now active in your Lata Jewellers catalogue.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-white p-5 md:p-6 border border-[#EDE5DC] rounded shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-[#3C2415] uppercase tracking-wider flex items-center gap-2 border-b border-[#EDE5DC] pb-3">
            <Gem className="w-4 h-4 text-[#722F37]" />
            <span>1. Basic Piece Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Jewellery Piece Title (English) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Rajputana Polki Choker Set"
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Title in Hindi (वैकल्पिक / Optional)
              </label>
              <input
                type="text"
                value={nameHindi}
                onChange={(e) => setNameHindi(e.target.value)}
                placeholder="e.g. राजपूताना पोलकी चोकर सेट"
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7] font-hindi"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              >
                <option value="necklaces">Necklaces & Sets</option>
                <option value="rings">Rings & Solitaires</option>
                <option value="earrings">Earrings & Jhumkas</option>
                <option value="bangles">Bangles & Kadas</option>
                <option value="bracelets">Bracelets & Chains</option>
                <option value="pendants">Pendants</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Collection *
              </label>
              <select
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              >
                <option value="bridal-jewellery">Bridal Jewellery</option>
                <option value="traditional-jewellery">Traditional Heritage</option>
                <option value="rings">Rings & Solitaires</option>
                <option value="necklaces">Necklaces</option>
                <option value="earrings">Earrings</option>
                <option value="bangles">Bangles</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Aesthetic Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              >
                <option value="traditional">Traditional Awadhi / Rajasthani</option>
                <option value="contemporary">Contemporary Modern</option>
                <option value="statement">Regal Bridal Statement</option>
                <option value="minimal">Minimal Everyday</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3C2415] mb-1">
              Description & Craftsmanship Story
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the craftsmanship technique, motifs, enamel work, and occasion suitability..."
              className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
            />
          </div>
        </div>

        {/* Section 2: Metal, Weight & Stones */}
        <div className="bg-white p-5 md:p-6 border border-[#EDE5DC] rounded shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-[#3C2415] uppercase tracking-wider flex items-center gap-2 border-b border-[#EDE5DC] pb-3">
            <Scale className="w-4 h-4 text-[#722F37]" />
            <span>2. Metal Purity & Weight Specifications</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Metal Type *
              </label>
              <select
                value={metal}
                onChange={(e) => {
                  setMetal(e.target.value);
                  if (e.target.value.includes('22K')) setPurity('22K (916 Hallmarked)');
                  else if (e.target.value.includes('18K')) setPurity('18K (750)');
                  else if (e.target.value.includes('14K')) setPurity('14K (585)');
                  else if (e.target.value.includes('Silver')) setPurity('925 Sterling Silver');
                  else setPurity('950 Platinum');
                }}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              >
                <option value="22K Gold (916)">22K Yellow Gold (916)</option>
                <option value="18K Yellow Gold (750)">18K Yellow Gold (750)</option>
                <option value="18K Rose Gold (750)">18K Rose Gold (750)</option>
                <option value="14K Gold (585)">14K Gold (585)</option>
                <option value="925 Sterling Silver">925 Sterling Silver</option>
                <option value="Platinum (950)">Platinum (950)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                BIS Purity Stamp
              </label>
              <input
                type="text"
                readOnly
                value={purity}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded bg-[#FAF8F5] text-[#8B7D6B] font-mono cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Gross Weight (grams) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={grossWeight}
                onChange={(e) => setGrossWeight(e.target.value)}
                placeholder="e.g. 42.50"
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Net Gold Weight (grams) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={netWeight}
                onChange={(e) => setNetWeight(e.target.value)}
                placeholder="e.g. 38.20"
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Making Charges (₹ per gram)
              </label>
              <input
                type="number"
                value={makingChargePerGram}
                onChange={(e) => setMakingChargePerGram(e.target.value)}
                placeholder="e.g. 650"
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Stones / Diamond Description
              </label>
              <input
                type="text"
                value={stoneType}
                onChange={(e) => setStoneType(e.target.value)}
                placeholder="e.g. Uncut Polki, Rubies & Pearls"
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Stones / Gemstones Value (₹)
              </label>
              <input
                type="number"
                value={stoneValue}
                onChange={(e) => setStoneValue(e.target.value)}
                placeholder="e.g. 45000"
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Live Price Calculation Breakdown */}
        <div className="bg-[#FAF8F5] p-5 md:p-6 border border-[#C5A059]/40 rounded shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#EDE5DC] pb-3">
            <h2 className="text-sm font-semibold text-[#3C2415] uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#C5A059]" />
              <span>3. Live Price Calculation Breakdown</span>
            </h2>
            <span className="text-[11px] text-[#722F37] font-semibold bg-[#722F37]/10 px-2 py-0.5 rounded">
              Current Benchmark: ₹{ratePerGram.toLocaleString('en-IN')}/g
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-3 rounded border border-[#EDE5DC]">
              <span className="text-[#8B7D6B] block text-[10px] uppercase">Base Metal Value</span>
              <span className="font-serif-display text-sm md:text-base font-bold text-[#3C2415] mt-1 block">
                ₹{baseGoldValue.toLocaleString('en-IN')}
              </span>
              <span className="text-[9px] text-[#8B7D6B]">{netWeightNum}g × ₹{ratePerGram}/g</span>
            </div>

            <div className="bg-white p-3 rounded border border-[#EDE5DC]">
              <span className="text-[#8B7D6B] block text-[10px] uppercase">Total Making Charges</span>
              <span className="font-serif-display text-sm md:text-base font-bold text-[#3C2415] mt-1 block">
                ₹{totalMakingCharges.toLocaleString('en-IN')}
              </span>
              <span className="text-[9px] text-[#8B7D6B]">{grossWeightNum}g × ₹{makingChargeRate}/g</span>
            </div>

            <div className="bg-white p-3 rounded border border-[#EDE5DC]">
              <span className="text-[#8B7D6B] block text-[10px] uppercase">GST (3% Statutory)</span>
              <span className="font-serif-display text-sm md:text-base font-bold text-[#3C2415] mt-1 block">
                ₹{gstAmount.toLocaleString('en-IN')}
              </span>
              <span className="text-[9px] text-[#8B7D6B]">Govt. Jewellery Tax</span>
            </div>

            <div className="bg-gradient-to-br from-[#722F37] to-[#4A151B] text-white p-3 rounded shadow-sm">
              <span className="text-white/80 block text-[10px] uppercase font-medium">Computed Price</span>
              <span className="font-serif-display text-lg md:text-xl font-bold text-[#F7E7CE] mt-1 block">
                ₹{calculatedTotalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[9px] text-white/70">All Taxes & Hallmark Included</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-xs text-[#8B7D6B] sm:w-48">
              Manual Selling Price Override (Optional ₹):
            </label>
            <input
              type="number"
              value={manualPriceOverride}
              onChange={(e) => setManualPriceOverride(e.target.value)}
              placeholder={`Leave blank to use ₹${calculatedTotalPrice.toLocaleString('en-IN')}`}
              className="flex-1 px-3 py-1.5 text-xs border border-[#EDE5DC] rounded bg-white focus:outline-none focus:border-[#722F37]"
            />
          </div>
        </div>

        {/* Section 4: Stock, Availability & BIS Hallmark */}
        <div className="bg-white p-5 md:p-6 border border-[#EDE5DC] rounded shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-[#3C2415] uppercase tracking-wider flex items-center gap-2 border-b border-[#EDE5DC] pb-3">
            <ShieldCheck className="w-4 h-4 text-[#722F37]" />
            <span>4. Stock & BIS Hallmarking</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Availability Mode *
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as 'in-stock' | 'made-to-order')}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              >
                <option value="in-stock">In-Stock (Ready to ship)</option>
                <option value="made-to-order">Made to Order (Crafted on request)</option>
              </select>
            </div>

            {availability === 'in-stock' ? (
              <div>
                <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                  Physical Inventory Count *
                </label>
                <input
                  type="number"
                  min="1"
                  value={inventoryCount}
                  onChange={(e) => setInventoryCount(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                  Crafting Lead Time (Days) *
                </label>
                <input
                  type="number"
                  min="3"
                  value={leadDays}
                  onChange={(e) => setLeadDays(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                BIS Hallmark HUID / Certificate
              </label>
              <input
                type="text"
                value={hallmarkHuid}
                onChange={(e) => setHallmarkHuid(e.target.value)}
                placeholder="e.g. HUID-916-LATA-8921"
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7] font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EDE5DC]">
          <Link
            href="/dashboard/products"
            className="px-4 py-2.5 text-xs text-[#8B7D6B] hover:text-[#3C2415] font-semibold uppercase tracking-wider transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-luxury-primary py-2.5 px-6 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center gap-2"
          >
            {isSubmitting ? (
              <span>Publishing Piece...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Publish Jewellery Piece (₹{finalPrice.toLocaleString('en-IN')})</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
