/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        JWT_SECRET: "JWT_SECRET",
        BACKEND: "https://voosh-backend-024v.onrender.com"
    }
};

export default nextConfig;
