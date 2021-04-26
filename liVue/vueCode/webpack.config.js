var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: '[name].build.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 8081,//端口
    open: true,//自动打开页面
    hot: true
  },
  module: {
    rules: [
      {
        test: '/\.js$/',
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '手写vue源码',
      filename: 'index.html',
      inject: 'body'
    })
  ]
}