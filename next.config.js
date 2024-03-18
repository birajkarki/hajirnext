/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    domains: [
      "source.unsplash.com",
      "https://via.placeholder.com",
      "production.veloxlabs.net",
    ],
  },
};

module.exports = nextConfig;
