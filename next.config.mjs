/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  async redirects() {
    return [
      // Preserve old About URL after route removal
      { source: "/about", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
