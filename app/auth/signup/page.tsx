'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Gem } from 'lucide-react';

export default function SignupPage() {
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    const { error: signUpError } = await signUp(email, password, fullName);

    if (signUpError) {
      setError(signUpError);
      setIsSubmitting(false);
    } else {
      router.push('/auth/login?message=signup_success');
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#3C2415] text-[#FFFEF7] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-[#C9A94E]/30" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full border border-[#C9A94E]/20" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <Gem className="w-6 h-6 text-[#C9A94E]" />
            <span className="font-serif text-2xl tracking-[0.04em]">Jeweller Market</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="font-serif text-4xl leading-tight">
            Join India&apos;s<br />
            <span className="text-[#C9A94E]">Jewellery Community</span>
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-md">
            Create an account to save your favourite pieces, track orders, and get personalised recommendations from trusted local jewellers.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-xs text-white/40">
          <span>Wishlist & Saves</span>
          <span className="w-1 h-1 rounded-full bg-[#C9A94E]" />
          <span>Order Tracking</span>
          <span className="w-1 h-1 rounded-full bg-[#C9A94E]" />
          <span>Verified Reviews</span>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-[#FFFEF7]">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <Gem className="w-5 h-5 text-[#C9A94E]" />
            <span className="font-serif text-lg tracking-[0.04em] text-[#3C2415]">Jeweller Market</span>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-[#3C2415]">Create your account</h2>
            <p className="mt-2 text-sm text-[#8B7D6B]">
              Start discovering beautiful jewellery from trusted local jewellers
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7D6B]" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm text-[#3C2415] placeholder:text-[#8B7D6B]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E] transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7D6B]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm text-[#3C2415] placeholder:text-[#8B7D6B]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E] transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-[#3C2415] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7D6B]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-12 py-3 bg-white border border-[#EDE5DC] rounded-sm text-sm text-[#3C2415] placeholder:text-[#8B7D6B]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A94E]/30 focus:border-[#C9A94E] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7D6B] hover:text-[#3C2415] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#3C2415] text-white text-sm font-medium rounded-sm hover:bg-[#2a1a10] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Creating account…' : 'Create Account'}
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#EDE5DC]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#FFFEF7] px-3 text-[#8B7D6B]">or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full py-3 bg-white border border-[#EDE5DC] text-sm text-[#3C2415] font-medium rounded-sm hover:bg-[#F5F0EB] transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-[#8B7D6B]">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#722F37] font-medium hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-xs text-center text-[#8B7D6B]/70">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
