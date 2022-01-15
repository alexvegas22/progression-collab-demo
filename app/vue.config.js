module.exports = {
	lintOnSave: false,
    transpileDependencies: [
        'vue-meta',
    ],
	devServer: {
		compress: true,
	},
	publicPath: process.env.NODE_ENV === 'production' ? '/' : ('/'+process.env.NODE_ENV),
}
