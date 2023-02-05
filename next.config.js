/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "replicate.delivery"],
  },
};

module.exports = nextConfig;
