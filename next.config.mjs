/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        domains: ['assets.frontend-swe.best', 'frontend-swe.best'],
      
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
            port: ''
          },
          {
            protocol: 'https',
            hostname: 'assets.frontend-swe.best',
            port: ''
          },
          {
            protocol: 'https',
            hostname: 'frontend-swe.best',
            port: ''
          }
        ]
      }
};

export default nextConfig;
