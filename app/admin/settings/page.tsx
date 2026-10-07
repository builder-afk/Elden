'use client';

import { useState } from 'react';
import { storeInfo } from '@/data/store';
import { Save, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    name: storeInfo.name,
    nameHindi: storeInfo.nameHindi,
    addressLine1: storeInfo.address.line1,
    addressLine2: storeInfo.address.line2,
    city: storeInfo.address.city,
    pincode: storeInfo.address.pincode,
    hoursOpen: storeInfo.hours.open,
    hoursClose: storeInfo.hours.close,
    goldRate22K: '₹6,850 / g',
    goldRate18K: '₹5,610 / g',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-serif-display text-2xl md:text-3xl text-[#3C2415]">
          Showroom & Store Settings
        </h1>
        <p className="text-xs text-[#8B7D6B]">
          Configure showroom operating hours, hallmarking rates, and store contact details
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Settings saved successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 md:p-8 border border-[#EDE5DC] rounded-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#3C2415] block mb-1">Store Name (English)</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full text-xs p-2.5 bg-[#F5F0EB] border border-[#EDE5DC] rounded"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#3C2415] block mb-1">Store Name (Hindi)</label>
            <input
              type="text"
              value={settings.nameHindi}
              onChange={(e) => setSettings({ ...settings, nameHindi: e.target.value })}
              className="w-full text-xs p-2.5 bg-[#F5F0EB] border border-[#EDE5DC] rounded font-hindi"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#3C2415] block mb-1">Address Line 1</label>
            <input
              type="text"
              value={settings.addressLine1}
              onChange={(e) => setSettings({ ...settings, addressLine1: e.target.value })}
              className="w-full text-xs p-2.5 bg-[#F5F0EB] border border-[#EDE5DC] rounded"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#3C2415] block mb-1">Area / Locality</label>
            <input
              type="text"
              value={settings.addressLine2}
              onChange={(e) => setSettings({ ...settings, addressLine2: e.target.value })}
              className="w-full text-xs p-2.5 bg-[#F5F0EB] border border-[#EDE5DC] rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#3C2415] block mb-1">Opening Time</label>
            <input
              type="text"
              value={settings.hoursOpen}
              onChange={(e) => setSettings({ ...settings, hoursOpen: e.target.value })}
              className="w-full text-xs p-2.5 bg-[#F5F0EB] border border-[#EDE5DC] rounded"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#3C2415] block mb-1">Closing Time</label>
            <input
              type="text"
              value={settings.hoursClose}
              onChange={(e) => setSettings({ ...settings, hoursClose: e.target.value })}
              className="w-full text-xs p-2.5 bg-[#F5F0EB] border border-[#EDE5DC] rounded"
            />
          </div>
        </div>

        <div className="border-t border-[#EDE5DC] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#3C2415] block mb-1">Today&apos;s 22K (916) Gold Rate</label>
            <input
              type="text"
              value={settings.goldRate22K}
              onChange={(e) => setSettings({ ...settings, goldRate22K: e.target.value })}
              className="w-full text-xs p-2.5 bg-[#F5F0EB] border border-[#EDE5DC] rounded font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#3C2415] block mb-1">Today&apos;s 18K (750) Gold Rate</label>
            <input
              type="text"
              value={settings.goldRate18K}
              onChange={(e) => setSettings({ ...settings, goldRate18K: e.target.value })}
              className="w-full text-xs p-2.5 bg-[#F5F0EB] border border-[#EDE5DC] rounded font-mono"
            />
          </div>
        </div>

        <button type="submit" className="btn-luxury-primary text-xs py-2.5 px-6 flex items-center gap-1.5">
          <Save className="w-4 h-4" /> Save Store Settings
        </button>
      </form>
    </div>
  );
}
