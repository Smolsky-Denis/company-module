const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // devServer: {
  //   contentBase: __dirname + '/src',
  //   overlay: true,
  //   historyApiFallback: true
  // }
});
