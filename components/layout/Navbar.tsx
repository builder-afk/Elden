'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Heart,
  Menu,
  X,
  ChevronDown,
  MapPin,
  User,
  LogOut,
  Store,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { useWishlist } from '@/components/wishlist/WishlistProvider';
import { useAuth } from '@/components/auth/AuthProvider';
import { collections } from '@/data/catalogue';
import { SearchModal } from '@/components/layout/SearchModal';

const navLinks = [
  {
    label: 'Collections',
    href: '/collections',
    hasDropdown: true,
    children: collections.filter((c) => c.featured).map((c) => ({
      label: c.name,
      href: `/collections/${c.slug}`,
    })),
  },
  { label: 'Bridal', href: '/bridal' },
  { label: 'Rings', href: '/rings' },
  { label: 'Occasions', href: '/occasions' },
  { label: 'Jewellers', href: '/sellers' },
  { label: 'About', href: '/about' },
  { label: 'Visit', href: '/store' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { count } = useWishlist();
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Click outside to close user menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FFFEF7]/95 backdrop-blur-md shadow-sm border-b border-[#EDE5DC]'
            : 'bg-[#FFFEF7]'
        }`}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[#3C2415] hover:text-[#722F37] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-center group">
              <span className="font-serif-display text-xl md:text-2xl tracking-[0.04em] text-[#3C2415] group-hover:text-[#722F37] transition-colors">
                Lata Jewellers
              </span>
              <span className="font-hindi text-[0.6rem] md:text-xs text-[#8B7D6B] tracking-wider -mt-0.5">
                लता ज्वैलर्स • Marketplace
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-xs tracking-[0.12em] uppercase text-[#3C2415]/80 hover:text-[#722F37] transition-colors py-2"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-2"
                        >
                          <div className="bg-[#FFFEF7] border border-[#EDE5DC] shadow-xl min-w-[200px] py-3">
                            {link.children?.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-5 py-2.5 text-xs tracking-[0.08em] uppercase text-[#3C2415]/70 hover:text-[#722F37] hover:bg-[#F7E7CE]/40 transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right icons & Auth */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#3C2415]/70 hover:text-[#722F37] transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              <Link
                href="/wishlist"
                className="relative p-2 text-[#3C2415]/70 hover:text-[#722F37] transition-colors"
                aria-label={`Wishlist (${count} items)`}
              >
                <Heart className="w-4.5 h-4.5" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#722F37] text-[#FFFEF7] text-[9px] font-medium rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>

              {/* User Account / Auth Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-1.5 p-1.5 md:px-2.5 md:py-1.5 rounded-full md:rounded-sm transition-all text-xs tracking-wider uppercase ${
                    user
                      ? 'bg-[#722F37]/10 text-[#722F37] border border-[#722F37]/20 font-medium'
                      : 'text-[#3C2415]/75 hover:text-[#722F37] hover:bg-[#F7E7CE]/30'
                  }`}
                  aria-label="User account menu"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline text-[11px]">
                    {user ? (user.fullName?.split(' ')[0] || 'Account') : 'Sign In'}
                  </span>
                  <ChevronDown className="w-3 h-3 hidden md:inline text-[#8B7D6B]" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-[#FFFEF7] border border-[#EDE5DC] shadow-xl z-50 py-2"
                    >
                      {user ? (
                        <>
                          <div className="px-4 py-3 border-b border-[#EDE5DC]/80 bg-[#FBF9F4]">
                            <p className="text-xs font-semibold text-[#3C2415] truncate">
                              {user.fullName || 'User'}
                            </p>
                            <p className="text-[11px] text-[#8B7D6B] truncate">
                              {user.email}
                            </p>
                            <span className="inline-block mt-1 px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold bg-[#722F37]/10 text-[#722F37] rounded">
                              {user.role}
                            </span>
                          </div>

                          <div className="py-1">
                            {user.role === 'seller' && (
                              <>
                                <Link
                                  href="/dashboard"
                                  onClick={() => setIsUserMenuOpen(false)}
                                  className="flex items-center gap-2 px-4 py-2 text-xs text-[#3C2415] hover:bg-[#F7E7CE]/30 hover:text-[#722F37]"
                                >
                                  <Store className="w-4 h-4 text-[#C5A059]" />
                                  <span>Seller Dashboard</span>
                                </Link>
                                <Link
                                  href="/dashboard/products"
                                  onClick={() => setIsUserMenuOpen(false)}
                                  className="flex items-center gap-2 px-4 py-2 text-xs text-[#3C2415] hover:bg-[#F7E7CE]/30 hover:text-[#722F37]"
                                >
                                  <Sparkles className="w-4 h-4 text-[#8B7D6B]" />
                                  <span>Manage Jewellery</span>
                                </Link>
                              </>
                            )}

                            {user.role === 'admin' && (
                              <Link
                                href="/admin"
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-xs text-[#3C2415] hover:bg-[#F7E7CE]/30 hover:text-[#722F37]"
                              >
                                <ShieldCheck className="w-4 h-4 text-[#722F37]" />
                                <span>Platform Admin</span>
                              </Link>
                            )}

                            {user.role === 'customer' && (
                              <Link
                                href="/auth/seller-register"
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-xs text-[#722F37] hover:bg-[#F7E7CE]/30 font-medium"
                              >
                                <Building2 className="w-4 h-4" />
                                <span>Register as Jeweller</span>
                              </Link>
                            )}

                            <button
                              onClick={handleSignOut}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-700 hover:bg-red-50 text-left transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="py-2">
                          <Link
                            href="/auth/login"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block px-4 py-2 text-xs tracking-wider uppercase font-medium text-[#3C2415] hover:bg-[#F7E7CE]/40 hover:text-[#722F37]"
                          >
                            Sign In to Account
                          </Link>
                          <Link
                            href="/auth/signup"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block px-4 py-2 text-xs text-[#8B7D6B] hover:bg-[#F7E7CE]/40 hover:text-[#3C2415]"
                          >
                            Create New Account
                          </Link>
                          <div className="my-1 border-t border-[#EDE5DC]" />
                          <Link
                            href="/auth/seller-register"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#722F37] hover:bg-[#722F37]/5 font-semibold"
                          >
                            <Store className="w-4 h-4 text-[#C5A059]" />
                            <span>Become a Partner Jeweller</span>
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/store"
                className="hidden md:flex items-center gap-1.5 ml-1 px-3.5 py-1.5 border border-[#3C2415]/15 text-xs tracking-[0.1em] uppercase text-[#3C2415]/80 hover:bg-[#3C2415] hover:text-[#FFFEF7] transition-luxury"
              >
                <MapPin className="w-3.5 h-3.5" />
                Visit
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-screen Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#FFFEF7]"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-[#EDE5DC]">
                <Link
                  href="/"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex flex-col"
                >
                  <span className="font-serif-display text-xl tracking-[0.04em] text-[#3C2415]">
                    Lata Jewellers
                  </span>
                  <span className="font-hindi text-[0.6rem] text-[#8B7D6B] -mt-0.5">
                    लता ज्वैलर्स • Marketplace
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 text-[#3C2415]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-5" aria-label="Mobile navigation">
                {/* User Status Bar */}
                {user ? (
                  <div className="p-3 mb-4 bg-[#FBF9F4] border border-[#EDE5DC] rounded">
                    <p className="text-sm font-semibold text-[#3C2415]">{user.fullName || 'User'}</p>
                    <p className="text-xs text-[#8B7D6B]">{user.email}</p>
                    <div className="mt-2 flex gap-2">
                      {user.role === 'seller' && (
                        <Link
                          href="/dashboard"
                          onClick={() => setIsMobileOpen(false)}
                          className="text-xs bg-[#722F37] text-white px-3 py-1 rounded inline-flex items-center gap-1 font-medium"
                        >
                          <Store className="w-3.5 h-3.5" />
                          Seller Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="text-xs border border-red-200 text-red-700 px-3 py-1 rounded hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMobileOpen(false)}
                      className="py-2.5 px-3 text-center text-xs tracking-wider uppercase font-medium bg-[#722F37] text-white rounded"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/seller-register"
                      onClick={() => setIsMobileOpen(false)}
                      className="py-2.5 px-3 text-center text-xs tracking-wider uppercase font-medium border border-[#722F37] text-[#722F37] rounded"
                    >
                      Sell With Us
                    </Link>
                  </div>
                )}

                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block py-3.5 border-b border-[#EDE5DC]/60"
                    >
                      <span className="font-serif-display text-xl tracking-[0.02em] text-[#3C2415]">
                        {link.label}
                      </span>
                    </Link>
                    {link.children && (
                      <div className="pl-4 pb-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="block py-2 text-sm text-[#8B7D6B] hover:text-[#722F37] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="p-5 border-t border-[#EDE5DC]">
                <Link
                  href="/store"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-luxury-primary w-full text-center justify-center"
                >
                  <MapPin className="w-4 h-4" />
                  Visit Showroom
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
