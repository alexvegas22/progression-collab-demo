module.exports = {
	lintOnSave: false,
	devServer: {
		compress: true,
		allowedHosts: "all",
	},
	transpileDependencies: [
		'vue-meta',
	],

	//Enlever en dev
	publicPath: "/" + import.meta.env.VITE_SUBDIR,

	configureWebpack: {
		resolve: {
			fallback: {
			"fs": false,
			"path": false,
			}
		}
	}
}
