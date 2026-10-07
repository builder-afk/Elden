'use client';

import { useState } from 'react';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Phone,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Search,
} from 'lucide-react';

interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  shippingAddress: string;
  items: {
    name: string;
    metal: string;
    purity: string;
    weight: string;
    price: number;
    image: string;
  }[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  courierName?: string;
  date: string;
}

const initialOrders: OrderItem[] = [
  {
    id: '1',
    orderNumber: 'JM-2026-0042',
    customerName: 'Pooja Agarwal',
    phone: '+91 98391 22334',
    email: 'pooja.agarwal@gmail.com',
    shippingAddress: 'Flat 402, Shalimar Heights, Civil Lines, Kanpur, UP - 208001',
    items: [
      {
        name: 'Kundan Bridal Necklace Set',
        metal: '22K Gold (916)',
        purity: '22K (916 Hallmarked)',
        weight: '84.5 g',
        price: 385000,
        image: '/images/products/bridal-necklace-1.jpg',
      },
    ],
    totalAmount: 385000,
    paymentMethod: 'Razorpay UPI (Axis Bank)',
    paymentStatus: 'paid',
    orderStatus: 'pending',
    date: '05 Oct 2026, 02:30 PM',
  },
  {
    id: '2',
    orderNumber: 'JM-2026-0039',
    customerName: 'Amit Saxena',
    phone: '+91 94151 55667',
    email: 'amit.saxena@outlook.com',
    shippingAddress: '12, Gomti Nagar Phase 2, Near Riverside Mall, Lucknow, UP - 226010',
    items: [
      {
        name: 'Diamond Solitaire Ring',
        metal: '18K Yellow Gold',
        purity: '18K (750)',
        weight: '5.2 g',
        price: 145000,
        image: '/images/products/solitaire-ring-1.jpg',
      },
    ],
    totalAmount: 145000,
    paymentMethod: 'Net Banking (HDFC)',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    date: '04 Oct 2026, 06:15 PM',
  },
  {
    id: '3',
    orderNumber: 'JM-2026-0031',
    customerName: 'Simran Chawla',
    phone: '+91 98101 99887',
    email: 'simran.chawla@gmail.com',
    shippingAddress: 'B-44, Greater Kailash 1, New Delhi - 110048',
    items: [
      {
        name: 'Polki Chandbali Earrings',
        metal: '22K Yellow Gold',
        purity: '22K (916 Hallmarked)',
        weight: '28.4 g',
        price: 168000,
        image: '/images/products/chandbali-1.jpg',
      },
    ],
    totalAmount: 168000,
    paymentMethod: 'Credit Card (ICICI)',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    courierName: 'Sequel Secure Valuables Logistics',
    trackingNumber: 'SEQL-IN-889921',
    date: '03 Oct 2026, 11:20 AM',
  },
  {
    id: '4',
    orderNumber: 'JM-2026-0025',
    customerName: 'Rajeev Singhania',
    phone: '+91 99350 44332',
    email: 'rajeev.singhania@gmail.com',
    shippingAddress: 'House 88, Swaroop Nagar, Kanpur, UP - 208002',
    items: [
      {
        name: 'Temple Gold Bangles Pair',
        metal: '22K Yellow Gold',
        purity: '22K (916 Hallmarked)',
        weight: '48.2 g',
        price: 265000,
        image: '/images/products/temple-bangles-1.jpg',
      },
    ],
    totalAmount: 265000,
    paymentMethod: 'Razorpay UPI (Google Pay)',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    courierName: 'Direct Insured Showroom Delivery',
    trackingNumber: 'KANPUR-LOCAL-091',
    date: '01 Oct 2026, 04:45 PM',
  },
];

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [courierInput, setCourierInput] = useState<{ [id: string]: string }>({});

  const handleUpdateStatus = (id: string, newStatus: OrderItem['orderStatus']) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          const updated: OrderItem = { ...order, orderStatus: newStatus };
          if (newStatus === 'shipped') {
            updated.courierName = 'Sequel Secure Logistics';
            updated.trackingNumber = courierInput[id] || 'SEQL-IN-' + Math.floor(100000 + Math.random() * 900000);
          }
          return updated;
        }
        return order;
      })
    );
  };

  const filteredOrders = orders.filter((o) => {
    const matchesTab = activeTab === 'all' || o.orderStatus === activeTab;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="font-serif-display text-2xl md:text-3xl text-[#3C2415]">
          Customer Orders & Fulfillment
        </h1>
        <p className="text-xs md:text-sm text-[#8B7D6B] mt-0.5">
          Process verified jewellery orders, verify customer shipping addresses, and assign insured courier tracking.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 border border-[#EDE5DC] rounded shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Orders', count: orders.length },
            { id: 'pending', label: 'Pending', count: orders.filter((o) => o.orderStatus === 'pending').length },
            { id: 'processing', label: 'Packed', count: orders.filter((o) => o.orderStatus === 'processing').length },
            { id: 'shipped', label: 'Shipped', count: orders.filter((o) => o.orderStatus === 'shipped').length },
            { id: 'delivered', label: 'Delivered', count: orders.filter((o) => o.orderStatus === 'delivered').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#722F37] text-white'
                  : 'text-[#8B7D6B] hover:text-[#3C2415] hover:bg-[#FBF9F5]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#EDE5DC] text-[#3C2415]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7D6B]" />
          <input
            type="text"
            placeholder="Search order number, buyer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-[#EDE5DC] rounded bg-[#FFFEF7] focus:outline-none focus:border-[#722F37]"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#EDE5DC] rounded text-[#8B7D6B]">
            <ShoppingBag className="w-10 h-10 text-[#C5A059] mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-[#3C2415]">No orders found</p>
            <p className="text-xs mt-1">There are no orders matching your selected status filter.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#EDE5DC] rounded shadow-sm overflow-hidden"
            >
              {/* Order Card Header */}
              <div className="p-4 bg-[#FAF8F5] border-b border-[#EDE5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-sm text-[#722F37]">
                    {order.orderNumber}
                  </span>
                  <span className="text-[#8B7D6B]">• {order.date}</span>
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3" /> {order.paymentMethod}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#8B7D6B]">Total Order Value:</span>
                  <span className="font-serif-display font-bold text-base text-[#3C2415]">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Order Card Body */}
              <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Items in order */}
                <div className="lg:col-span-2 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B7D6B] block">
                    Jewellery Items Ordered
                  </span>
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-[#FFFEF7] border border-[#EDE5DC] rounded"
                    >
                      <div className="w-14 h-14 rounded bg-[#EDE5DC] overflow-hidden flex-shrink-0 relative border border-[#EDE5DC]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-semibold text-[#3C2415] truncate">{item.name}</p>
                        <p className="text-[11px] text-[#8B7D6B]">{item.metal} • {item.purity}</p>
                        <p className="text-[10px] text-[#C5A059] font-medium">Weight: {item.weight}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-serif-display font-bold text-sm text-[#722F37]">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        <span className="block text-[9px] text-emerald-700">100% Insured</span>
                      </div>
                    </div>
                  ))}

                  {/* Tracking info if shipped */}
                  {order.orderStatus === 'shipped' && (
                    <div className="p-3 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="font-semibold">Shipped via {order.courierName}</p>
                          <p className="text-[11px] font-mono">Tracking AWBL: {order.trackingNumber}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded font-bold">
                        Insured In-Transit
                      </span>
                    </div>
                  )}

                  {order.orderStatus === 'delivered' && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <p className="font-semibold">Successfully Delivered to Customer</p>
                        <p className="text-[11px] text-emerald-700">Customer confirmation & OTP verified.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Customer & Fulfillment Action */}
                <div className="border-t lg:border-t-0 lg:border-l border-[#EDE5DC] lg:pl-6 space-y-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B7D6B] block mb-1">
                      Customer & Delivery Details
                    </span>
                    <p className="font-semibold text-sm text-[#3C2415]">{order.customerName}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#8B7D6B] mt-1">
                      <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{order.phone}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-[11px] text-[#8B7D6B] mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#722F37] flex-shrink-0 mt-0.5" />
                      <span>{order.shippingAddress}</span>
                    </div>
                  </div>

                  {/* Actions according to status */}
                  <div className="pt-3 border-t border-[#EDE5DC] space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B7D6B] block">
                      Fulfillment Action
                    </span>

                    {order.orderStatus === 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'processing')}
                        className="w-full py-2 px-3 bg-[#722F37] text-white text-xs font-semibold rounded shadow-sm hover:bg-[#59232a] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>Accept & Start Packing</span>
                      </button>
                    )}

                    {order.orderStatus === 'processing' && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Enter Courier AWB / Tracking No."
                          value={courierInput[order.id] || ''}
                          onChange={(e) =>
                            setCourierInput({ ...courierInput, [order.id]: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 text-xs border border-[#EDE5DC] rounded focus:outline-none focus:border-[#722F37]"
                        />
                        <button
                          onClick={() => handleUpdateStatus(order.id, 'shipped')}
                          className="w-full py-2 px-3 bg-purple-700 text-white text-xs font-semibold rounded shadow-sm hover:bg-purple-800 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Dispatch & Mark as Shipped</span>
                        </button>
                      </div>
                    )}

                    {order.orderStatus === 'shipped' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'delivered')}
                        className="w-full py-2 px-3 bg-emerald-700 text-white text-xs font-semibold rounded shadow-sm hover:bg-emerald-800 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm Customer Delivery</span>
                      </button>
                    )}

                    {order.orderStatus === 'delivered' && (
                      <div className="p-2.5 bg-gray-50 border border-gray-200 text-gray-700 rounded text-center text-[11px] font-medium">
                        Order Complete & Payout Settled
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
