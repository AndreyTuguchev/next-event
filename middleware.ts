import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    '/', 
    '/about',
    '/assets(.*)',
    '/images(.*)',
    '/favicon.ico',
    '/events/:id', 
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
  ],
  
    ignoredRoutes: [ 
      '/assets(.*)',
      '/images(.*)',
      '/favicon.ico',
      '/api/webhook/clerk',
      '/api/webhook/stripe',
      '/api/uploadthing',
    ],

});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};