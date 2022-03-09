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
	publicPath: "/" + process.env.VUE_APP_SUBDIR,
}
