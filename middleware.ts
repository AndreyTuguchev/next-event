import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    '/', 
    '/events/:id', 
    '/_next/*', 
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing',
    '/assets/images/',
    '/assets/icons/',
  ],
  
    ignoredRoutes: [ 
      '/api/webhook/clerk',
      '/api/webhook/stripe',
      '/_next/*', 
      '/api/uploadthing',
      '/assets/images/',
      '/assets/icons/',
    ],


});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};