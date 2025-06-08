/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
      },
    ],

    domains: [
      "localhost",
      "shopping-phinf.pstatic.net",
      "i.ytimg.com",
      "firebasestorage.googleapis.com",
      "yt3.ggpht.com",
    ],

    formats: ["image/webp"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            demensions: false,
          },
        },
      ],
    });

    return config;
  },
  experimental: {
    turbo: false,
  },
  async rewrites() {
    return [
      {
        source: "/api/clothes",
        destination: "https://openapi.naver.com/v1/search/shop.json",
      },
    ];
  },
};

module.exports = nextConfig;
