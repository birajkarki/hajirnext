/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    domains: [
      "source.unsplash.com",
      "https://via.placeholder.com",
      "veloxlabs.net",
	"http://production.veloxlabs.net",
    ],
  },
};

module.exports = nextConfig;
