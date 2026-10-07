'use client';

import { useState } from 'react';
import Image from 'next/image';
import { products } from '@/data/catalogue';
import { Gem, Plus, Search, Filter } from 'lucide-react';

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('All');

  const filtered = products.filter((p) => {
    if (selectedCollection !== 'All' && p.collection !== selectedCollection) return false;
    if (
      searchTerm &&
      !p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-2xl md:text-3xl text-[#3C2415]">
            Product Catalogue & Inventory
          </h1>
          <p className="text-xs text-[#8B7D6B]">
            Manage showroom jewellery inventory, hallmarking specs, and pricing
          </p>
        </div>

        <button
          onClick={() => alert('New product addition will connect to your Supabase product registry.')}
          className="btn-luxury-primary text-xs py-2 px-4 flex items-center gap-1.5 w-fit"
        >
          <Plus className="w-4 h-4" /> Add New Piece
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 border border-[#EDE5DC] rounded-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8B7D6B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by design name or SKU code..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-[#F5F0EB] rounded border border-[#EDE5DC] focus:outline-none"
          />
        </div>

        <select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
          className="text-xs bg-[#F5F0EB] border border-[#EDE5DC] px-3 py-2 rounded text-[#3C2415] focus:outline-none"
        >
          <option value="All">All Collections</option>
          <option value="Bridal Jewellery">Bridal Jewellery</option>
          <option value="Rings">Rings</option>
          <option value="Earrings">Earrings</option>
          <option value="Bangles">Bangles</option>
          <option value="Necklaces">Necklaces</option>
          <option value="Chains">Chains</option>
        </select>
      </div>

      <div className="bg-white border border-[#EDE5DC] rounded-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0EB] text-[#8B7D6B] uppercase tracking-wider border-b border-[#EDE5DC]">
              <tr>
                <th className="p-3.5">Piece</th>
                <th className="p-3.5">SKU / Code</th>
                <th className="p-3.5">Collection</th>
                <th className="p-3.5">Purity & Metal</th>
                <th className="p-3.5">Gross Weight</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE5DC]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#F5F0EB]/40 transition-colors">
                  <td className="p-3.5 flex items-center gap-3">
                    <div className="relative w-10 h-10 bg-[#EDE5DC] rounded overflow-hidden shrink-0">
                      {p.images[0]?.url && (
                        <Image
                          src={p.images[0].url}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="font-medium text-[#3C2415]">{p.name}</span>
                  </td>
                  <td className="p-3.5 font-mono text-[#8B7D6B]">{p.sku}</td>
                  <td className="p-3.5 text-[#8B7D6B]">{p.collection}</td>
                  <td className="p-3.5">{p.purity || p.metal}</td>
                  <td className="p-3.5">{p.grossWeight || '—'}</td>
                  <td className="p-3.5 font-semibold text-[#3C2415]">
                    {p.price ? `₹${p.price.toLocaleString('en-IN')}` : 'Enquire'}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 text-[10px] rounded uppercase font-medium ${
                        p.availability === 'in-stock'
                          ? 'bg-[#25D366]/10 text-[#25D366]'
                          : 'bg-[#722F37]/10 text-[#722F37]'
                      }`}
                    >
                      {p.availability}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
