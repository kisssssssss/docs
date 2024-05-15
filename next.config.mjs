/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	transpilePackages: ['antd', '@ant-design/icons'],
	images:{
		remotePatterns:[
			{
				protocol: 'https',
				hostname: '**',
				port: '',
				pathname: '**'
			}
		]
	}
};

export default nextConfig;
