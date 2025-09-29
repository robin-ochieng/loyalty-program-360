import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const PUBLIC_PATHS = [
  '/auth',
  '/forgot-password',
  '/reset-password',
  '/api/health',
  '/favicon.svg',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public & static assets
  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith('/_next') ||
    /\.(svg|png|jpg|jpeg|gif|webp|ico)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  // Create a Supabase server client bound to middleware lifecycle
  // The cookie helpers expected by createServerClient in middleware context
  const cookieAdapter: {
    get(name: string): string | undefined;
    set(name: string, value: string, options: CookieOptions): void;
    remove(name: string, options: CookieOptions): void;
  } = {
    get(name) {
      return req.cookies.get(name)?.value;
    },
    set(name, value, options) {
      res.cookies.set({ name, value, ...options });
    },
    remove(name, options) {
      res.cookies.set({ name, value: '', ...options });
    },
  };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: cookieAdapter },
  );

  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    const dest = req.nextUrl.clone();
    const redirectUrl = new URL('/auth', req.url);
    redirectUrl.searchParams.set('mode', 'signin');
    redirectUrl.searchParams.set('redirect', dest.pathname + dest.search);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/((?!.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
