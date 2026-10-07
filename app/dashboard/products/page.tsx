'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { products as initialProducts } from '@/data/catalogue';
import { Product } from '@/types';

export default function SellerProductsPage() {
  const [productList, setProductList] = useState<Product[]>(
    initialProducts.filter((p) => p.sellerId === 'seller-lata-001' || !p.sellerId)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');

  const filteredProducts = productList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.metal && product.metal.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || product.categorySlug === selectedCategory;

    const matchesAvailability =
      selectedAvailability === 'all' || product.availability === selectedAvailability;

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from your active listings?`)) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleToggleStock = (id: string) => {
    setProductList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextAvail = p.availability === 'in-stock' ? 'made-to-order' : 'in-stock';
          return {
            ...p,
            availability: nextAvail,
            inventoryCount: nextAvail === 'in-stock' ? 3 : 0,
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-2xl md:text-3xl text-[#3C2415]">
            Jewellery Inventory
          </h1>
          <p className="text-xs md:text-sm text-[#8B7D6B] mt-0.5">
            Manage your hallmarked pieces, update live prices, and track physical inventory.
          </p>
        </div>

        <Link
          href="/dashboard/products/new"
          className="btn-luxury-primary flex items-center justify-center gap-2 text-xs tracking-wider uppercase py-2.5 px-4 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Piece</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-[#EDE5DC] rounded shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7D6B]" />
          <input
            type="text"
            placeholder="Search by jewellery title, SKU (e.g. LJ-101), or metal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37] bg-[#FFFEF7]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-[#8B7D6B]">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs py-1.5 px-2.5 border border-[#EDE5DC] rounded bg-[#FFFEF7] text-[#3C2415] focus:outline-none focus:border-[#722F37]"
          >
            <option value="all">All Categories</option>
            <option value="necklaces">Necklaces & Sets</option>
            <option value="rings">Rings & Solitaires</option>
            <option value="earrings">Earrings & Jhumkas</option>
            <option value="bangles">Bangles & Kadas</option>
            <option value="bracelets">Bracelets</option>
            <option value="pendants">Pendants</option>
            <option value="chains">Gold Chains</option>
          </select>

          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="text-xs py-1.5 px-2.5 border border-[#EDE5DC] rounded bg-[#FFFEF7] text-[#3C2415] focus:outline-none focus:border-[#722F37]"
          >
            <option value="all">All Stock Status</option>
            <option value="in-stock">In Stock Ready to Ship</option>
            <option value="made-to-order">Made to Order</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#EDE5DC] rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#8B7D6B] uppercase tracking-wider border-b border-[#EDE5DC]">
              <tr>
                <th className="py-3 px-4 font-semibold">Jewellery Piece</th>
                <th className="py-3 px-4 font-semibold">Metal / Purity</th>
                <th className="py-3 px-4 font-semibold">Weight</th>
                <th className="py-3 px-4 font-semibold">Selling Price</th>
                <th className="py-3 px-4 font-semibold">Stock Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE5DC]/70 text-[#3C2415]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8B7D6B]">
                    <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-2 opacity-60" />
                    <p className="text-sm font-medium">No jewellery pieces match your filters.</p>
                    <p className="text-xs mt-1">Try resetting your search query or add a new piece.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#FBF9F5] transition-colors">
                    {/* Item Image + Title + SKU */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-[#EDE5DC] overflow-hidden flex-shrink-0 relative border border-[#EDE5DC]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.images[0]?.url || '/images/hero/bridal-hero.jpg'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            className="font-medium text-[#3C2415] hover:text-[#722F37] transition-colors line-clamp-1 flex items-center gap-1 group"
                          >
                            <span>{product.name}</span>
                            <ExternalLink className="w-3 h-3 text-[#8B7D6B] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <span className="font-mono text-[10px] text-[#8B7D6B] block">
                            SKU: {product.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Metal & Purity */}
                    <td className="py-3 px-4">
                      <p className="font-medium text-[#3C2415]">{product.metal || '22K Gold'}</p>
                      <span className="text-[10px] text-[#C5A059] font-medium">
                        {product.purity || '916 BIS Hallmarked'}
                      </span>
                    </td>

                    {/* Weight */}
                    <td className="py-3 px-4">
                      <p className="font-medium text-[#3C2415]">{product.grossWeight || '—'}</p>
                      {product.netWeight && (
                        <span className="text-[10px] text-[#8B7D6B]">Net: {product.netWeight}</span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-serif-display font-bold text-sm text-[#722F37]">
                      ₹{(product.price || 0).toLocaleString('en-IN')}
                    </td>

                    {/* Stock Status toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStock(product.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                          product.availability === 'in-stock'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                        title="Click to toggle stock status"
                      >
                        {product.availability === 'in-stock' ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            <span>In Stock ({product.inventoryCount || 3})</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3" />
                            <span>Made to Order</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="p-1.5 text-[#8B7D6B] hover:text-[#3C2415] hover:bg-[#EDE5DC]/40 rounded transition-colors"
                          title="View on Storefront"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/dashboard/products/new?edit=${product.id}`}
                          className="p-1.5 text-[#8B7D6B] hover:text-[#722F37] hover:bg-[#722F37]/10 rounded transition-colors"
                          title="Edit Jewellery Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-[#FAF8F5] border-t border-[#EDE5DC] text-[11px] text-[#8B7D6B] flex items-center justify-between">
          <span>Showing {filteredProducts.length} of {productList.length} total listings</span>
          <span className="text-[#C5A059] font-medium">All items authenticated with Lata Jewellers BIS hallmark ID</span>
        </div>
      </div>
    </div>
  );
}
