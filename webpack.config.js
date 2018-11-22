const path = require('path');
const SRC_DIR = path.join(__dirname, 'client', 'src');
const DIST_DIR = path.join(__dirname, 'client', 'dist');
const webpack = require('webpack');

module.exports = {
	entry: path.join(SRC_DIR, 'index.js'),
	output: {
		path: DIST_DIR,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.css', '.json']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
        test: /\.png$/,
        loader: 'url-loader?limit=100000&minetype=image/png'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
			},
			{
        test : /\.js$/,
        include : SRC_DIR,
        loader : 'babel-loader',
      }
		],
	},
	plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
