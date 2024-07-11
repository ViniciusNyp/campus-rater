import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default ({ mode }) => {
	return defineConfig({
		define: {
			'process.env': loadEnv(mode, process.cwd(), ''),
		},
		publicDir: './public',
		base: './',
		plugins: [
			svgr({
				exportAsDefault: true,
			}),
			react(),
		],
		resolve: {
			alias: {
				src: path.resolve(__dirname, './src'),
				'@': path.resolve(__dirname, './src'),
			},
		},
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
				},
			},
		},
		server: {
			host: true,
		},
	});
};
