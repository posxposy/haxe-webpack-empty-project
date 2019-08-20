const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = !process.env.production;

const PATHS = {
	dist: path.join(__dirname, '../dist'),
	src: path.join(__dirname, '../src'),
	assets: 'assets/'
}

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: './common.hxml',
	output: {
		filename: `${PATHS.assets}js/[name].js`,
		path: PATHS.dist
	},
	module: {
		rules: [
			{
				test: /\.hxml$/,
				loader: 'haxe-loader',
				options: {
					debug: isDev,
					sizeReport: true
				}
			},{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			}, {
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: isDev,
						}
					}, {
						loader: 'postcss-loader',
						options: {
							sourceMap: isDev,
							config: {
								path: './config/postcss.config.js'
							}
						}
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: isDev,
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].css`
		}),
		new HtmlWebpackPlugin({
			hash: false,
			template: `${PATHS.src}/index.html`,
			filename: './index.html'
		}),
		new CopyWebpackPlugin([
			{ from: `${PATHS.src}/img`, to: `${PATHS.assets}img/` },
			{ from: `${PATHS.src}/static`, to: '' },
		])
	]
}