const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')

module.exports = function(app) {
  // setup on the fly compilation + hot-reload
  webpackConfig.entry.app = ['webpack-hot-middleware/client', webpackConfig.entry.app]
  webpackConfig.output.filename = '[name].js'

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  )

  const clientCompiler = webpack(webpackConfig)
  const developmentMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
    },
  })

  // Hot middleware
  app.use(require('webpack-hot-middleware')(clientCompiler))
  app.use(developmentMiddleware)

  return clientCompiler
}
