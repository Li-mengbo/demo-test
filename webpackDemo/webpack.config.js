var path = require('path');
module.exports = {
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, 'loader/testLoader.js'),
            options: {
              name: 'Limengbo'
            }
          },
          {
            loader: path.resolve(__dirname, 'loader/mengboLoader.js')
          }
        ]

      }
    ]
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loader'), 'node_modules'],
  }
}
