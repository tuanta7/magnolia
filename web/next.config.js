module.exports = {
  async redirects() {
    return [
      {
        source: "/manutd",
        destination: "/",
        permanent: true,
      },
      {
        source: `/manutd/:slug*`,
        destination: "/:slug*",
        permanent: true,
      },
    ];
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [new URL("http://localhost:8080/**")],
  },
};
