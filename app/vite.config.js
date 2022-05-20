import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import 'reflect-metadata'

const path = require("path");

export default defineConfig({
	plugins: [vue()],
	resolve: {
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
		alias: {
			"@": path.resolve(__dirname, "./src"),
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
		environment: 'jsdom',
		deps: {
			inline: [
			  "markdown-it-imsize"
			]
		  },	  
	  },
});
