'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import {
  Gem,
  Store,
  MapPin,
  FileCheck,
  Landmark,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
} from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

const steps = [
  { num: 1, label: 'Account', icon: Gem },
  { num: 2, label: 'Store Details', icon: Store },
  { num: 3, label: 'Address', icon: MapPin },
  { num: 4, label: 'Verification', icon: FileCheck },
];

export default function SellerRegisterPage() {
  const { user, signUp } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<Step>(user ? 2 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1 — Account
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Step 2 — Store details
  const [storeName, setStoreName] = useState('');
  const [storeNameHindi, setStoreNameHindi] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [gstin, setGstin] = useState('');
  const [pan, setPan] = useState('');

  // Step 3 — Address
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  // Step 4 — Bank details
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [bankName, setBankName] = useState('');

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (user) {
      setStep(2);
      return;
    }
    setIsSubmitting(true);
    const { error: signUpError } = await signUp(email, password, fullName);
    if (signUpError) {
      setError(signUpError);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setStep(2);
    }
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!storeName.trim() || !phone.trim()) {
      setError('Store name and phone are required');
      return;
    }
    setStep(3);
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!addressLine1.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
      setError('Please fill all required address fields');
      return;
    }
    setStep(4);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      if (!currentUser) {
        setError('You must be signed in. Please go back to Step 1.');
        setIsSubmitting(false);
        return;
      }

      const sellerData = {
        user_id: currentUser.id,
        store_name: storeName.trim(),
        store_slug: generateSlug(storeName),
        store_name_hindi: storeNameHindi.trim() || null,
        description: description.trim() || null,
        phone: phone.trim(),
        whatsapp: whatsapp.trim() || null,
        email: currentUser.email,
        gstin: gstin.trim() || null,
        pan: pan.trim() || null,
        address: {
          line1: addressLine1.trim(),
          line2: addressLine2.trim() || null,
          area: area.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
        },
        bank_details: accountNumber
          ? {
              account_name: accountName.trim(),
              account_number: accountNumber.trim(),
              ifsc: ifsc.trim(),
              bank_name: bankName.trim(),
            }
          : null,
        verification_status: 'pending',
      };

      const { error: insertError } = await supabase
        .from('sellers')
        .insert([sellerData]);

      if (insertError) {
        if (insertError.code === '23505') {
          setError('A store with this name or your account is already registered.');
        } else {
          setError(insertError.message);
        }
        setIsSubmitting(false);
        return;
      }

      // Redirect to a confirmation page
      router.push('/auth/seller-register/success');
    } catch {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-[#3C2415] text-white py-6">
        <div className="max-w-2xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Gem className="w-5 h-5 text-[#C9A94E]" />
            <span className="font-serif text-lg tracking-[0.04em]">Jeweller Market</span>
          </Link>
          <h1 className="font-serif text-3xl">Register Your Store</h1>
          <p className="text-white/60 text-sm mt-2">
            Join India&apos;s trusted jewellery marketplace and reach new customers
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white border-b border-[#EDE5DC]">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = step >= s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                        isActive
                          ? isCurrent
                            ? 'bg-[#3C2415] text-white'
                            : 'bg-[#C9A94E] text-white'
                          : 'bg-[#EDE5DC] text-[#8B7D6B]'
                      }`}
                    >
                      {step > s.num ? <Check className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                    </div>
                    <span
                      className={`hidden sm:block text-xs ${
                        isActive ? 'text-[#3C2415] font-medium' : 'text-[#8B7D6B]'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-20 h-px mx-2 ${
                        step > s.num ? 'bg-[#C9A94E]' : 'bg-[#EDE5DC]'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Step 1: Account */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="space-y-6">
            <div className="bg-white p-6 border border-[#EDE5DC] rounded-sm space-y-5">
              <h2 className="font-serif text-xl text-[#3C2415]">Create Your Account</h2>
              <p className="text-sm text-[#8B7D6B]">
                {user
                  ? `You're signed in as ${user.email}. Continue to store details.`
                  : 'First, create an account that will manage your store.'}
              </p>

              {!user && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Full Name *</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Email Address *</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Password *</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-[#3C2415] text-white text-sm font-medium rounded-sm hover:bg-[#2a1a10] disabled:opacity-60 flex items-center gap-2">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Store Details */}
        {step === 2 && (
          <form onSubmit={handleStep2} className="space-y-6">
            <div className="bg-white p-6 border border-[#EDE5DC] rounded-sm space-y-5">
              <h2 className="font-serif text-xl text-[#3C2415]">Store Details</h2>
              <p className="text-sm text-[#8B7D6B]">Tell customers about your jewellery store.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Store Name *</label>
                  <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} required placeholder="e.g., Lata Jewellers" className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Store Name (Hindi)</label>
                  <input type="text" value={storeNameHindi} onChange={(e) => setStoreNameHindi(e.target.value)} placeholder="e.g., लता ज्वैलर्स" className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Tell customers what makes your store special…" className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E] resize-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Phone *</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+91-XXXXXXXXXX" className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">WhatsApp</label>
                  <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+91-XXXXXXXXXX" className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">GSTIN</label>
                  <input type="text" value={gstin} onChange={(e) => setGstin(e.target.value)} placeholder="22AAAAA0000A1Z5" className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">PAN</label>
                  <input type="text" value={pan} onChange={(e) => setPan(e.target.value)} placeholder="ABCDE1234F" className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="px-6 py-3 text-sm text-[#8B7D6B] hover:text-[#3C2415] flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button type="submit" className="px-6 py-3 bg-[#3C2415] text-white text-sm font-medium rounded-sm hover:bg-[#2a1a10] flex items-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Address */}
        {step === 3 && (
          <form onSubmit={handleStep3} className="space-y-6">
            <div className="bg-white p-6 border border-[#EDE5DC] rounded-sm space-y-5">
              <h2 className="font-serif text-xl text-[#3C2415]">Store Address</h2>
              <p className="text-sm text-[#8B7D6B]">Where is your physical store located?</p>

              <div>
                <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Address Line 1 *</label>
                <input type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required placeholder="Shop no., building name, street" className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Address Line 2</label>
                <input type="text" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} placeholder="Landmark, market name" className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Area / Locality *</label>
                  <input type="text" value={area} onChange={(e) => setArea(e.target.value)} required className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">City *</label>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">State *</label>
                  <input type="text" value={state} onChange={(e) => setState(e.target.value)} required className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Pincode *</label>
                  <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required pattern="[0-9]{6}" maxLength={6} className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(2)} className="px-6 py-3 text-sm text-[#8B7D6B] hover:text-[#3C2415] flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button type="submit" className="px-6 py-3 bg-[#3C2415] text-white text-sm font-medium rounded-sm hover:bg-[#2a1a10] flex items-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Bank Details + Submit */}
        {step === 4 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div className="bg-white p-6 border border-[#EDE5DC] rounded-sm space-y-5">
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5 text-[#C9A94E]" />
                <div>
                  <h2 className="font-serif text-xl text-[#3C2415]">Bank Details</h2>
                  <p className="text-sm text-[#8B7D6B]">For receiving payouts (can be added later)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Account Holder Name</label>
                  <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Bank Name</label>
                  <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">Account Number</label>
                  <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">IFSC Code</label>
                  <input type="text" value={ifsc} onChange={(e) => setIfsc(e.target.value)} className="w-full px-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E]" />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-[#FFFEF7] p-6 border border-[#C9A94E]/30 rounded-sm space-y-3">
              <h3 className="font-serif text-lg text-[#3C2415]">Registration Summary</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-[#8B7D6B]">Store:</span>
                <span className="text-[#3C2415] font-medium">{storeName}</span>
                <span className="text-[#8B7D6B]">Location:</span>
                <span className="text-[#3C2415]">{city}, {state}</span>
                <span className="text-[#8B7D6B]">Phone:</span>
                <span className="text-[#3C2415]">{phone}</span>
                {gstin && (
                  <>
                    <span className="text-[#8B7D6B]">GSTIN:</span>
                    <span className="text-[#3C2415]">{gstin}</span>
                  </>
                )}
              </div>
              <p className="text-xs text-[#8B7D6B] pt-2 border-t border-[#EDE5DC]">
                After submission, our team will review your application within 2–3 business days. You&apos;ll receive an email once verified.
              </p>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(3)} className="px-6 py-3 text-sm text-[#8B7D6B] hover:text-[#3C2415] flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-[#722F37] text-white text-sm font-medium rounded-sm hover:bg-[#5a252c] disabled:opacity-60 flex items-center gap-2">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {isSubmitting ? 'Submitting…' : 'Submit Registration'}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-[#8B7D6B] mt-8">
          Already have a seller account?{' '}
          <Link href="/auth/login" className="text-[#722F37] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
