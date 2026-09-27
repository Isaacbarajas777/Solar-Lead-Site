import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The questionnaire moved from /quiz to the homepage.
      { source: "/quiz", destination: "/", permanent: false },
      { source: "/es/quiz", destination: "/es", permanent: false },
    ];
  },
};

export default nextConfig;
