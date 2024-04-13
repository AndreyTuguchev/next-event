/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
            port: ''
          },
          {
            protocol: 'https',
            hostname: 'cdn.frontend-swe.best',
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
