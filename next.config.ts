import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-5a26fdbcb2504a28807e1fd77bd4c4a6.r2.dev",
        port: "",
        pathname: "/**",
      },
      // { protocol: 'https', hostname: '*.r2.dev' }
    ],
  },
};

export default nextConfig;
