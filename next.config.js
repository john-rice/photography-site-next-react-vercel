module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['ik.imagekit.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/my-account/**',
      },
    ],
  },
}
