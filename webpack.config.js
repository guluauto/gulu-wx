var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    index: './asset/js/index.js',
    testers: './asset/js/testers.js',
    'testers-v2': './asset/js/testers-v2.js',
    tester: './asset/js/tester.js',
    reserve: './asset/js/reserve.js',
    feature: './asset/js/feature.js',
    flow: './asset/js/flow.js',
    inspect: './asset/js/inspect.js',
    my: './asset/js/my.js',
    'bind-mobile': './asset/js/bind-mobile.js',
    comment: './asset/js/comment.js',
    vendor: ['./bower_components/zepto/dist/zepto.js', './bower_components/touch.code.baidu.com/touch-0.2.14.js']
  },
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    publicPath: 'dist/js/',
    filename: '[name].bundle.js',
    chunkFilename: "[id].chunk.js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ],
  module: {
    loaders: [
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg|svg|ttf)(#[a-zA-Z]*)$/, loader: 'url-loader?limit=8192' },
      { test: /\.(html|htm)$/, loader: 'html-loader' },
      { test: /\.(woff|eot)(#[a-zA-Z]*)$/, loader: 'file-loader' }
    ]
  }
};
