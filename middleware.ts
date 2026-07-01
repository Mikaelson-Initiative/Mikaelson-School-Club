import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Protect /admin-login to only allow hasbulla4school subdomain or localhost
  if (url.pathname.startsWith('/admin-login')) {
    if (!hostname.includes('hasbulla4school') && !hostname.includes('localhost')) {
      // Rewrite to a non-existent page to trigger the custom 404 (not-found.tsx)
      return NextResponse.rewrite(new URL('/_not-found-trigger', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin-login/:path*',
};
