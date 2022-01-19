module.exports = {
	lintOnSave: false,
    transpileDependencies: [
        'vue-meta',
    ],
	devServer: {
		compress: true,
	},
	publicPath: "/" + process.env.VUE_APP_SUBDIR,
}
