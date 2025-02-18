/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
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
