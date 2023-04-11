import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	server: {
		host: true,
		hmr:  {
			clientPort: 8000
		}
	},
	envDir: ".",
	test: {
		globals: true,
		environment: 'jsdom'
	  },
});
