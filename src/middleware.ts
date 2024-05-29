import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { navRoutes } from '@/constants/nav';

const protectedRoutes = navRoutes.map(({ href }) => href),
  isProtectedRoute = createRouteMatcher(protectedRoutes);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
