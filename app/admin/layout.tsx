import Link from 'next/link';
import {
  LayoutDashboard,
  CalendarCheck,
  HeartHandshake,
  Gem,
  Settings,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';

const adminNav = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Appointments CRM', href: '/admin/appointments', icon: CalendarCheck },
  { label: 'Bridal Enquiries', href: '/admin/bridal', icon: HeartHandshake },
  { label: 'Product Inventory', href: '/admin/products', icon: Gem },
  { label: 'Showroom Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F0EB] flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-[#3C2415] text-[#FFFEF7] p-6 shrink-0 flex flex-col justify-between">
        <div>
          <div className="mb-8 border-b border-white/10 pb-4">
            <span className="font-serif-display text-xl tracking-[0.04em] text-white block">
              Lata Jewellers
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#C9A94E] block mt-0.5">
              Staff Portal & CRM
            </span>
          </div>

          <nav className="space-y-1.5" aria-label="Admin Navigation">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#C9A94E]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-8 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-6xl">
        {children}
      </main>
    </div>
  );
}
