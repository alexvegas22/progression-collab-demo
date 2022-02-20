module.exports = {
    lintOnSave: false,
    devServer: {
        compress: true,
        disableHostCheck: true,
    },
    transpileDependencies: [
        'vue-meta',
    ],
    publicPath: "/" + process.env.VUE_APP_SUBDIR,
	node: {
		fs: "empty",
		path: "empty",
	};	
}
