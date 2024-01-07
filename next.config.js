/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
     return [
        {
        source: '/:path*',
        has: [{ type: "host", value: "simandhareducation.com" }],
        destination: 'https://www.simandhareducation.com/:path*',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['app.alphalearn.com', 's3.ap-south-1.amazonaws.com','amazonaws.com','simandhareducation-files.s3.ap-south-1.amazonaws.com', 'devapi.simandhareducation.com', 'simandhareducation-files.s3.ap-south-1.amazonaws.comimg'], // Add the hostname for your images here
  },
 

}







module.exports = nextConfig

