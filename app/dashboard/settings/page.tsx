'use client';

import { useState } from 'react';
import {
  Store,
  Building2,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Save,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';
import { sellers } from '@/data/sellers';

export default function SellerSettingsPage() {
  const lataSeller = sellers.find((s) => s.id === 'seller-lata-001') || sellers[0];

  const [saved, setSaved] = useState(false);
  const [storeName, setStoreName] = useState(lataSeller.storeName);
  const [storeNameHindi, setStoreNameHindi] = useState(lataSeller.storeNameHindi || 'लता ज्वैलर्स');
  const [description, setDescription] = useState(lataSeller.description || '');
  const [phone, setPhone] = useState(lataSeller.phone);
  const [whatsapp, setWhatsapp] = useState(lataSeller.whatsapp || '');
  const [email, setEmail] = useState(lataSeller.email);
  const [line1, setLine1] = useState(lataSeller.address.line1);
  const [area, setArea] = useState(lataSeller.address.area);
  const [city, setCity] = useState(lataSeller.address.city);
  const [state, setState] = useState(lataSeller.address.state);
  const [pincode, setPincode] = useState(lataSeller.address.pincode);
  const [gstin, setGstin] = useState(lataSeller.gstin || '09AAACL1234F1Z5');
  const [pan, setPan] = useState(lataSeller.pan || 'AAACL1234F');
  const [bisLicense, setBisLicense] = useState('BIS/HM/UP/KN-916024');

  // Bank Details
  const [accountName, setAccountName] = useState('LATA JEWELLERS PVT LTD');
  const [bankName, setBankName] = useState('State Bank of India');
  const [accountNumber, setAccountNumber] = useState('3899210045612');
  const [ifsc, setIfsc] = useState('SBIN0001784');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="font-serif-display text-2xl md:text-3xl text-[#3C2415]">
          Store Settings & Profile
        </h1>
        <p className="text-xs md:text-sm text-[#8B7D6B] mt-0.5">
          Update your public jewellery storefront details, tax registration, and payout bank account.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm font-semibold">Store profile & payout details updated successfully!</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Store Branding & Identity */}
        <div className="bg-white p-5 md:p-6 border border-[#EDE5DC] rounded shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-[#3C2415] uppercase tracking-wider flex items-center gap-2 border-b border-[#EDE5DC] pb-3">
            <Store className="w-4 h-4 text-[#722F37]" />
            <span>1. Store Identity & Public Profile</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Store Name (English) *
              </label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Store Name in Hindi (दुकान का नाम)
              </label>
              <input
                type="text"
                value={storeNameHindi}
                onChange={(e) => setStoreNameHindi(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7] font-hindi"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3C2415] mb-1">
              Store Heritage & Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Contact Phone *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                WhatsApp Inquiry Number
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Official Business Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Physical Showroom Location */}
        <div className="bg-white p-5 md:p-6 border border-[#EDE5DC] rounded shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-[#3C2415] uppercase tracking-wider flex items-center gap-2 border-b border-[#EDE5DC] pb-3">
            <MapPin className="w-4 h-4 text-[#722F37]" />
            <span>2. Showroom Address & Location</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Street Address / Shop No. *
              </label>
              <input
                type="text"
                required
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Market / Area *
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                PIN Code *
              </label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Tax & Hallmarking Registration */}
        <div className="bg-white p-5 md:p-6 border border-[#EDE5DC] rounded shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-[#3C2415] uppercase tracking-wider flex items-center gap-2 border-b border-[#EDE5DC] pb-3">
            <ShieldCheck className="w-4 h-4 text-[#722F37]" />
            <span>3. Tax & BIS Hallmark Registration</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                GSTIN Number *
              </label>
              <input
                type="text"
                required
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7] font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Business PAN Card *
              </label>
              <input
                type="text"
                required
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7] font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                BIS Hallmarking License ID
              </label>
              <input
                type="text"
                value={bisLicense}
                onChange={(e) => setBisLicense(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7] font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Bank Details for Payouts */}
        <div className="bg-white p-5 md:p-6 border border-[#EDE5DC] rounded shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#EDE5DC] pb-3">
            <h2 className="text-sm font-semibold text-[#3C2415] uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#722F37]" />
              <span>4. Bank Account for Weekly Payouts</span>
            </h2>
            <span className="text-[11px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded">
              Commission Rate: 8.0%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Account Holder Name *
              </label>
              <input
                type="text"
                required
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7] uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Bank Name *
              </label>
              <input
                type="text"
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                Bank Account Number *
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3C2415] mb-1">
                IFSC Code *
              </label>
              <input
                type="text"
                required
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7] font-mono uppercase"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="btn-luxury-primary py-2.5 px-6 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
