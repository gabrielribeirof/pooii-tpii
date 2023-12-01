/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'uploads.jovemnerd.com.br',
			}
		]
	}
}

module.exports = nextConfig
