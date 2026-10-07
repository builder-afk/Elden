'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Settings,
  Store,
  ExternalLink,
  LogOut,
  Bell,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Jewellery Pieces', href: '/dashboard/products', icon: Package },
  { label: 'Add New Piece', href: '/dashboard/products/new', icon: PlusCircle },
  { label: 'Customer Orders', href: '/dashboard/orders', icon: ShoppingBag, badge: '3' },
  { label: 'Store Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#3C2415] flex flex-col">
      {/* Top Banner / Verification status */}
      <div className="bg-[#722F37] text-[#FFFEF7] px-4 py-2 text-xs flex items-center justify-between">
        <div className="container-luxury flex items-center justify-between w-full mx-auto">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#C5A059] text-[#3C2415] font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" /> BIS Verified
            </span>
            <span className="hidden sm:inline text-white/90">
              Lata Jewellers Portal • Vidyarthi Market, Kanpur
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#F7E7CE]">22K Gold Rate: ₹7,930/g</span>
            <Link
              href="/sellers/lata-jewellers"
              target="_blank"
              className="hidden md:flex items-center gap-1 text-white/90 hover:text-white underline"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-1 relative">
        {/* Mobile menu trigger */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3.5 bg-[#722F37] text-white rounded-full shadow-xl flex items-center justify-center"
            aria-label="Toggle Dashboard Menu"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-[33px] left-0 h-screen lg:h-[calc(100vh-33px)] w-64 bg-white border-r border-[#EDE5DC] z-40 flex flex-col transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Store Info Header */}
          <div className="p-5 border-b border-[#EDE5DC]">
            <Link href="/" className="block">
              <span className="font-serif-display text-lg tracking-wide text-[#3C2415] font-bold">
                Lata Jewellers
              </span>
              <span className="block font-hindi text-xs text-[#8B7D6B]">
                विक्रेता पोर्टल (Seller Portal)
              </span>
            </Link>
            <div className="mt-3 flex items-center gap-2 px-2.5 py-1.5 bg-[#FBF9F5] border border-[#EDE5DC] rounded text-xs">
              <Store className="w-4 h-4 text-[#C5A059]" />
              <span className="text-[#3C2415] font-medium truncate">Govind Nagar Store</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Seller menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded text-xs tracking-wider uppercase font-medium transition-all ${
                    isActive
                      ? 'bg-[#722F37] text-white shadow-sm'
                      : 'text-[#3C2415]/75 hover:bg-[#F7E7CE]/30 hover:text-[#722F37]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8B7D6B]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        isActive ? 'bg-white text-[#722F37]' : 'bg-[#722F37] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-[#EDE5DC]">
              <div className="px-3 pb-2 text-[10px] tracking-wider uppercase text-[#8B7D6B] font-semibold">
                Quick Marketplace Links
              </div>
              <Link
                href="/sellers/lata-jewellers"
                target="_blank"
                className="flex items-center justify-between px-3.5 py-2 text-xs text-[#3C2415]/75 hover:text-[#722F37] hover:bg-[#F7E7CE]/20 rounded"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
                  Public Storefront
                </span>
                <ChevronRight className="w-3 h-3 text-[#8B7D6B]" />
              </Link>
              <Link
                href="/sellers"
                className="flex items-center justify-between px-3.5 py-2 text-xs text-[#3C2415]/75 hover:text-[#722F37] hover:bg-[#F7E7CE]/20 rounded"
              >
                <span className="flex items-center gap-2">
                  <Store className="w-3.5 h-3.5 text-[#8B7D6B]" />
                  All Jewellers Directory
                </span>
                <ChevronRight className="w-3 h-3 text-[#8B7D6B]" />
              </Link>
            </div>
          </nav>

          {/* User profile / Logout */}
          <div className="p-3 border-t border-[#EDE5DC] bg-[#FAF8F5]">
            <div className="flex items-center justify-between px-2 py-1 mb-2">
              <div className="truncate">
                <p className="text-xs font-semibold text-[#3C2415] truncate">
                  {user?.fullName || 'Seller Partner'}
                </p>
                <p className="text-[11px] text-[#8B7D6B] truncate">
                  {user?.email || 'contact@latajewellers.com'}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-red-700 bg-red-50 hover:bg-red-100 rounded transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/40 z-30"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
