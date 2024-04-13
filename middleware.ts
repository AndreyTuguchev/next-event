import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    '/', 
    '/events/:id', 
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
    '/_next/image',
    '/assets/images/',
    '/assets/icons/',
  ],
  
    ignoredRoutes: [ 
      '/api/webhook/clerk',
      '/api/webhook/stripe',
      '/api/uploadthing',
    ],


});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};