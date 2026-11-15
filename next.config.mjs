/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/opt1", destination: "/", permanent: true },
      { source: "/opt1/index.html", destination: "/", permanent: true },
      { source: "/:section(art|isolon|formation|about)/index.html", destination: "/:section", permanent: true },
      { source: "/art/index_art.html", destination: "/art", permanent: true },
      { source: "/art.html", destination: "/art", permanent: true },
      { source: "/ready-made.html", destination: "/art#models", permanent: true },
      { source: "/custom-flower.html", destination: "/art#order", permanent: true },
      { source: "/izolon", destination: "/isolon", permanent: true },
      { source: "/spaceformation", destination: "/formation", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
