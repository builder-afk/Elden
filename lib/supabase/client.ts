'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client for use in Client Components.
 * Uses the public anon key — all access is governed by RLS policies.
 */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

/**
 * Browser-side Supabase client for use in Client Components.
 * Uses the public anon key — all access is governed by RLS policies.
 */
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

/**
 * Singleton client instance for backwards compatibility with existing queries.
 */
export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);


