/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Firebase Hosting
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow admin app to access shared resources from parent directory
  transpilePackages: [],
  // Disable trailing slash for Firebase
  trailingSlash: false,
}

export default nextConfig
