const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

const conf = merge(base, {
	mode: 'development',
	devtool: 'cheap-eval-source-map', //source-map
	devServer: {
		inline: true,
		contentBase: base.externals.paths.dist,
		compress: true,
		port: 8081,
		overlay: true,         // show build errors
		watchContentBase: true
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map'
		})
	]
});

module.exports = new Promise((resolve, reject) => resolve(conf));
