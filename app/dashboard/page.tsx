'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Star,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Sparkles,
  ChevronRight,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { products } from '@/data/catalogue';

export default function SellerDashboardPage() {
  const sellerProducts = products.filter(
    (p) => p.sellerId === 'seller-lata-001' || !p.sellerId
  );

  const [orders] = useState([
    {
      id: 'ORD-2026-901',
      customer: 'Pooja Agarwal',
      city: 'Kanpur, UP',
      item: 'Kundan Bridal Necklace Set (22K)',
      amount: '₹3,85,000',
      status: 'pending',
      date: 'Today, 2:30 PM',
      payment: 'Paid (UPI)',
    },
    {
      id: 'ORD-2026-898',
      customer: 'Amit Saxena',
      city: 'Lucknow, UP',
      item: 'Diamond Solitaire Ring (18K)',
      amount: '₹1,45,000',
      status: 'processing',
      date: 'Yesterday, 6:15 PM',
      payment: 'Paid (Net Banking)',
    },
    {
      id: 'ORD-2026-885',
      customer: 'Simran Chawla',
      city: 'Delhi NCR',
      item: 'Polki Chandbali Earrings (22K)',
      amount: '₹1,68,000',
      status: 'shipped',
      date: '04 Oct, 2026',
      payment: 'Paid (Card)',
    },
    {
      id: 'ORD-2026-870',
      customer: 'Rajeev Singhania',
      city: 'Kanpur, UP',
      item: 'Temple Gold Bangles Pair (22K)',
      amount: '₹2,65,000',
      status: 'delivered',
      date: '02 Oct, 2026',
      payment: 'Paid (UPI)',
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#722F37] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Verified Marketplace Partner
          </div>
          <h1 className="font-serif-display text-2xl md:text-3xl text-[#3C2415]">
            Seller Dashboard
          </h1>
          <p className="text-xs md:text-sm text-[#8B7D6B] mt-1">
            Manage your jewellery listings, track orders, and monitor your hallmark sales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/products/new"
            className="btn-luxury-primary flex items-center gap-2 text-xs tracking-wider uppercase py-2.5 px-4 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>List New Jewellery</span>
          </Link>
        </div>
      </div>

      {/* Live Gold & Precious Metal Rates Banner */}
      <div className="bg-gradient-to-r from-[#2A1810] to-[#3C2415] text-[#FFFEF7] p-4 md:p-5 rounded-sm shadow-md border border-[#C5A059]/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#F7E7CE]">
              Today&apos;s Live Market Benchmark Rates (IBJA Kanpur)
            </span>
          </div>
          <span className="text-[11px] text-[#C5A059]">Auto-refreshed: 10:00 AM IST</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-center sm:text-left">
          <div className="bg-white/5 p-2.5 rounded">
            <span className="text-[10px] uppercase tracking-wider text-white/70 block">24K Pure Gold</span>
            <span className="text-base md:text-lg font-serif-display text-[#F7E7CE] font-bold">₹8,650</span>
            <span className="text-[10px] text-white/50 block">per gram</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded">
            <span className="text-[10px] uppercase tracking-wider text-white/70 block">22K Standard Gold (916)</span>
            <span className="text-base md:text-lg font-serif-display text-[#C5A059] font-bold">₹7,930</span>
            <span className="text-[10px] text-white/50 block">per gram</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded">
            <span className="text-[10px] uppercase tracking-wider text-white/70 block">18K Diamond Jewellery (750)</span>
            <span className="text-base md:text-lg font-serif-display text-white font-bold">₹6,490</span>
            <span className="text-[10px] text-white/50 block">per gram</span>
          </div>
          <div className="bg-white/5 p-2.5 rounded">
            <span className="text-[10px] uppercase tracking-wider text-white/70 block">Fine Silver (999)</span>
            <span className="text-base md:text-lg font-serif-display text-white/90 font-bold">₹98.50</span>
            <span className="text-[10px] text-white/50 block">per gram</span>
          </div>
        </div>
      </div>

      {/* Performance KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-[#EDE5DC] rounded shadow-sm">
          <div className="flex items-center justify-between text-[#8B7D6B] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Revenue (30d)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif-display text-2xl font-bold text-[#3C2415]">
            ₹14,80,000
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <span>+18.4%</span>
            <span className="text-[#8B7D6B]">from previous month</span>
          </p>
        </div>

        <div className="bg-white p-5 border border-[#EDE5DC] rounded shadow-sm">
          <div className="flex items-center justify-between text-[#8B7D6B] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Active Listings</span>
            <Package className="w-4 h-4 text-[#722F37]" />
          </div>
          <div className="font-serif-display text-2xl font-bold text-[#3C2415]">
            {sellerProducts.length} Pieces
          </div>
          <p className="text-[11px] text-[#8B7D6B] mt-1">
            All 100% BIS Hallmarked
          </p>
        </div>

        <div className="bg-white p-5 border border-[#EDE5DC] rounded shadow-sm">
          <div className="flex items-center justify-between text-[#8B7D6B] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Orders This Month</span>
            <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="font-serif-display text-2xl font-bold text-[#3C2415]">
            18 Orders
          </div>
          <p className="text-[11px] text-amber-700 font-medium mt-1">
            3 orders need dispatch
          </p>
        </div>

        <div className="bg-white p-5 border border-[#EDE5DC] rounded shadow-sm">
          <div className="flex items-center justify-between text-[#8B7D6B] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Customer Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="font-serif-display text-2xl font-bold text-[#3C2415]">
            4.9 ★
          </div>
          <p className="text-[11px] text-[#8B7D6B] mt-1">
            Based on 127 verified reviews
          </p>
        </div>
      </div>

      {/* Orders & Quick Fulfillment Section */}
      <div className="bg-white border border-[#EDE5DC] rounded shadow-sm">
        <div className="p-5 border-b border-[#EDE5DC] flex items-center justify-between">
          <div>
            <h2 className="font-serif-display text-lg text-[#3C2415] font-semibold">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-[#8B7D6B]">
              Track incoming purchases, verify payments, and provide insured courier tracking.
            </p>
          </div>
          <Link
            href="/dashboard/orders"
            className="text-xs text-[#722F37] font-semibold hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#8B7D6B] uppercase tracking-wider border-b border-[#EDE5DC]">
              <tr>
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Jewellery Item</th>
                <th className="py-3 px-4 font-semibold">Total Amount</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE5DC]/70 text-[#3C2415]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FBF9F5] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-[#722F37]">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-[#3C2415]">{order.customer}</p>
                    <p className="text-[10px] text-[#8B7D6B]">{order.city}</p>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate">
                    {order.item}
                  </td>
                  <td className="py-3.5 px-4 font-serif-display font-bold">
                    {order.amount}
                    <span className="block text-[9px] font-normal text-emerald-700">{order.payment}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    {order.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                        <Clock className="w-3 h-3" /> Pending Dispatch
                      </span>
                    )}
                    {order.status === 'processing' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                        <Package className="w-3 h-3" /> Being Packed
                      </span>
                    )}
                    {order.status === 'shipped' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-100 text-purple-800">
                        <Truck className="w-3 h-3" /> In Transit
                      </span>
                    )}
                    {order.status === 'delivered' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> Delivered
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href="/dashboard/orders"
                      className="px-2.5 py-1 text-[11px] font-medium border border-[#3C2415]/20 hover:border-[#722F37] hover:text-[#722F37] rounded transition-colors inline-block"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Featured Pieces Quick Overview */}
      <div className="bg-white border border-[#EDE5DC] rounded shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif-display text-lg text-[#3C2415] font-semibold">
              Live Showcase Pieces
            </h2>
            <p className="text-xs text-[#8B7D6B]">
              Your top-selling jewellery pieces currently active in the marketplace.
            </p>
          </div>
          <Link
            href="/dashboard/products"
            className="text-xs text-[#722F37] font-semibold hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            <span>Manage All ({sellerProducts.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sellerProducts.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="p-3 border border-[#EDE5DC] rounded flex items-center gap-3 bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors"
            >
              <div className="w-16 h-16 bg-[#EDE5DC] rounded overflow-hidden flex-shrink-0 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images[0]?.url || '/images/hero/bridal-hero.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#3C2415] truncate">{product.name}</p>
                <p className="text-[11px] text-[#8B7D6B]">{product.metal || '22K Gold'}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-serif-display text-xs font-bold text-[#722F37]">
                    ₹{(product.price || 0).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-medium">
                    {product.availability === 'in-stock' ? 'In Stock (4)' : 'Made to Order'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
