

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode for development warnings
  images: {
    domains: ['books.google.com', 'covers.openlibrary.org'], // Allow external images from specified domains
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false }; // Resolve fs module issue in the client-side code
    }
    return config;
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, // Public key for Stripe
    NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY, // API key for Google Books API
  },
  async rewrites() {
    return [
      {
        source: '/api/books',
        destination: 'https://www.googleapis.com/books/v1/volumes', // Rewrite to Google Books API
      },
    ];
  },
};

export default nextConfig;
