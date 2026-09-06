/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/lavia',
        destination: '/lavia/index.html',
      },
    ];
  },
};

export default nextConfig;
