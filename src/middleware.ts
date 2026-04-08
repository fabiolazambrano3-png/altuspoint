import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // First run intl middleware for locale handling
  const intlResponse = intlMiddleware(request);

  // Refresh Supabase session (keeps cookies alive)
  const { user, supabaseResponse } = await updateSession(request);

  const pathname = request.nextUrl.pathname;

  // Protect admin routes: require authenticated user
  const isAdminRoute = /^\/(es|en)\/admin/.test(pathname);
  if (isAdminRoute && !user) {
    const locale = pathname.startsWith('/en') ? 'en' : 'es';
    const loginUrl = new URL(`/${locale}/cuenta/login`, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protect account routes (but not login page itself)
  const isAccountRoute = /^\/(es|en)\/cuenta(?!\/login)/.test(pathname);
  if (isAccountRoute && !user) {
    const locale = pathname.startsWith('/en') ? 'en' : 'es';
    const loginUrl = new URL(`/${locale}/cuenta/login`, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and visits login page, redirect to account
  const isLoginRoute = /^\/(es|en)\/cuenta\/login/.test(pathname);
  if (isLoginRoute && user) {
    const locale = pathname.startsWith('/en') ? 'en' : 'es';
    return NextResponse.redirect(new URL(`/${locale}/cuenta`, request.url));
  }

  // Merge Supabase cookies into intl response
  if (intlResponse) {
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      intlResponse.cookies.set(cookie.name, cookie.value);
    });
    return intlResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
