/** @type {import('next').NextConfig} */
const nextConfig = {
	// trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "db.kennedyadams.ca",
				port: "",
				pathname: "/greenlife/images/**",
			},
		],
	},
	env: {
		dbUSER: process.env.dbUSER,
		dbPASS: process.env.dbPASS,
	},
};

export default nextConfig;
