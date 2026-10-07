import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * OAuth callback handler — Supabase redirects here after Google sign-in.
 * Exchanges the auth code for a session, then redirects based on user role.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Get the user to determine redirect destination
      const { data: { user } } = await supabase.auth.getUser();
      const role = user?.app_metadata?.role;

      let redirectTo = next;
      if (role === 'seller') {
        redirectTo = '/dashboard';
      } else if (role === 'admin') {
        redirectTo = '/admin';
      }

      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${redirectTo}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${redirectTo}`);
      } else {
        return NextResponse.redirect(`${origin}${redirectTo}`);
      }
    }
  }

  // Auth code exchange failed — redirect to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
