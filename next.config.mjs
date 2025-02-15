/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/invoices/add",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
