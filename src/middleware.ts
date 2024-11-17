import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { ROOT, LOGIN, PUBLIC_ROUTES } from '@/lib/routes';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    // Get the token using next-auth
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Check if the current path is a public route
    const isPublicRoute = PUBLIC_ROUTES.some(route =>
      pathname.startsWith(route),
    );

    console.log({
      pathname,
      isPublicRoute,
      hasToken: !!token,
    });

    // Redirect authenticated users away from login page
    if (token && pathname === LOGIN) {
      console.log(
        'Authenticated user trying to access login page, redirecting to root',
      );

      const redirectUrl = new URL(ROOT, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Redirect unauthenticated users to login if trying to access protected route
    if (!token && !isPublicRoute) {
      console.log(
        'Unauthenticated user trying to access protected route, redirecting to login',
      );

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

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };

export const config = {
  matcher: ['/((?!api|_next|public|.*\\.[\\w]+$).*)'],
};
