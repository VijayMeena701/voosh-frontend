/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        JWT_SECRET: "JWT_SECRET",
        BACKEND: "http://localhost:5000"
    }
};

export default nextConfig;
