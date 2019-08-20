const merge = require('webpack-merge');
const base = require('./webpack.base.config');

const conf = merge(base, {
	mode: "production"
});

module.exports = new Promise((resolve, reject) => resolve(conf));
