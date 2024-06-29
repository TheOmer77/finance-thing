import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { navRoutes } from '@/constants/nav';

const protectedRoutes = navRoutes.map(({ href }) => href),
  isProtectedRoute = createRouteMatcher(protectedRoutes),
  isAuthRoute = createRouteMatcher(['/signin', '/signup']);

export default clerkMiddleware((auth, req) => {
  const { userId, protect } = auth();
  if (isProtectedRoute(req)) protect();
  if (isAuthRoute(req) && userId)
    return NextResponse.redirect(
      req.nextUrl.searchParams.get('redirect_url') ||
        process.env.NEXT_PUBLIC_APP_URL!
    );
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
