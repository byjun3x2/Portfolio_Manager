/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8080/api/:path*',
            },
        ];
    },
    images: {
        domains: ['localhost', 'example.com'],
    },
    typescript: {
        ignoreBuildErrors: false,
    },
};

module.exports = nextConfig;
