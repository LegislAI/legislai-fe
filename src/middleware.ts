import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { ROOT, LOGIN, PUBLIC_ROUTES } from '@/lib/routes';

const AUTH_COOKIE = 'access_token';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    const token = cookies().get(AUTH_COOKIE)?.value;

    // Check if the current path is a public route
    const isPublicRoute = PUBLIC_ROUTES.some(route =>
      pathname.startsWith(route),
    );

    // Redirect authenticated users away from login page
    if (token && pathname === LOGIN) {
      const redirectUrl = new URL(ROOT, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Redirect unauthenticated users to login if trying to access protected route
    if (!token && !isPublicRoute) {
      const loginUrl = new URL(LOGIN, request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);

    // In case of error, redirect to login
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next|public|.*\\.[\\w]+$).*)'],
};
