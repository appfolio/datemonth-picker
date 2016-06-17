const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: `${__dirname}/dist/`,
    publicPath: '/dist/',
    filename: 'DateMonth.js',
    library: 'DateMonth',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.css/, loader: 'style-loader!css-loader!autoprefixer-loader' },
      { test: /\.html/, loader: 'ractive-loader' },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  devServer: {
    inline: true,
    port: 3000
  }
};
