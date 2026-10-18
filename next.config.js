const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 2026.10.17: .babelrc 제거 후 SWC 컴파일러로 styled-components 변환 처리
  compiler: {
    styledComponents: true,
  },
  // 2026.08.12: Dart Sass (@use "tokens" / @use "mixin") 
  // 경로 해석 문제 해결을 위한 설정
  // 2026.10.17: Next.js 16 sass-loader v16(Modern Sass API) 적용으로 includePaths → loadPaths 변경
  sassOptions: {
    loadPaths: [path.join(__dirname, "src/styles")],
  },
  // 2026.10.17: Next.js 16 마이그레이션 - deprecated된 images.domains > remotePatterns로 통합
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
      {
        protocol: "https",
        hostname: "ads-partners.coupang.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn1.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn2.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn3.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "serpapi.com",
      }
    ],

    formats: ["image/webp"],
  },
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
