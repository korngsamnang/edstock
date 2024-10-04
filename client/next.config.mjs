/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3-edstock.s3.ap-southeast-1.amazonaws.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    output: "standalone",
};

export default nextConfig;
