import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Creates a Supabase client for use in Next.js middleware.
 * Handles session refresh by reading/writing cookies on the request/response pair.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // If Supabase is not configured or in placeholder mode, allow seamless local development
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder')
  ) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session — this is critical for keeping auth tokens alive
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = user?.app_metadata?.role as string | undefined;
  const pathname = request.nextUrl.pathname;

  // ── Route protection ──

  // Seller dashboard requires 'seller' or 'admin' role
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    if (role !== 'seller' && role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // Platform admin requires 'admin' role
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    if (role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  // Customer-only routes (orders, cart for logged-in)
  if (pathname.startsWith('/orders') || pathname.startsWith('/account')) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Auth pages should redirect to home if already logged in
  if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup')) {
    if (user) {
      const url = request.nextUrl.clone();
      if (role === 'seller') {
        url.pathname = '/dashboard';
      } else if (role === 'admin') {
        url.pathname = '/admin';
      } else {
        url.pathname = '/';
      }
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
