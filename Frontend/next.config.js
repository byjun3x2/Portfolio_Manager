/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:9999/api/:path*',
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
