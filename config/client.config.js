const base = require('./webpack.config.js/index.js')

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const {GenerateSW} = require('workbox-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const CopyPlugin = require('copy-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default // 😬
const RobotstxtPlugin = require('robotstxt-webpack-plugin')

const siteMeta = require('./meta.config.js')
const {productionHost} = require('./config.js')

const isProduction = process.env.NODE_ENV === 'production'

const Visualizer = require('webpack-visualizer-plugin')

const config = {
  ...base,

  entry: {
    app: './client/entry-client.js',
  },
  plugins: [
    ...(base.plugins || []),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
    }),
    // For prod css extraction remove this and see webpack.base.config
    new MiniCssExtractPlugin({
      filename: `[name]${isProduction ? '.[contenthash]' : ''}.css`,
      chunkFilename: `[id]${isProduction ? '.[contenthash]' : ''}.css`,
    }),
    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRClientPlugin(),
    new WebpackBuildNotifierPlugin({
      title: 'Webpack Client Build',
      suppressSuccess: true,
    }),
    new Visualizer(),
  ],
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
    warnings: true,
    children: true,
  },
}

if (isProduction) {
  // This automatically takes care of vendor splitting
  config.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /[/\\]node_modules[/\\]/,
        chunks: 'initial',
        // chunks: 'all',
        name: 'vendor',
        enforce: true,
      },
    },
  }

  // Add Compression plugins and service worker caching
  config.plugins.push(
    new CompressionPlugin({
      filename: '[path].br[query]',
      test: /\.js$|\.css$/,
      algorithm: 'brotliCompress',
      compressionOptions: {level: 11},
    }),
    // It'd be best to read options for this and cater to specific project needs
    // https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
    // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW#GenerateSW
    new GenerateSW({
      // This will interpret a leading slash as root
      swDest: path.join('proxy_to_site_root', '/service-worker.js'),
      // If false a separate runtime will be generated and needs to be served in parallel
      inlineWorkboxRuntime: true,
      runtimeCaching: [{
        urlPattern: /.*/,
        handler: 'NetworkFirst',
        // Options:
        // cacheFirst
        // fastest
        // networkOnly
        // cacheOnly
        // Why u no slowest?
      }],
      include: [
        /dist\/.*\.css/,
        /dist\/img\/.*/,
        /dist\/.*\.js/,
        // TODO: cache fonts?
      ],
      // Don't allow the service worker to try to cache google analytics or your tracking will stop working
      // Disable any other scripts you don't want cached here as well
      exclude: [/google-analytics.com/],
    }),
    // These paths are joined here so that
    // path, paths, and subsequently fs are not included on client where this is use
    new WebpackPwaManifest({
      name: siteMeta.name,
      short_name: siteMeta.short_name, // eslint-disable-line camelcase
      description: siteMeta.description,
      background_color: siteMeta.color, // eslint-disable-line camelcase
      theme_color: siteMeta.color, // eslint-disable-line camelcase
      // crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
      icons: siteMeta.manifestIcons.map(({src: source, ...rest}) => {
        return {
          src: path.join('public/icons', source),
          ...rest,
        }
      }),
      filename: 'manifest.json',
      display: siteMeta.display,
      start_url: siteMeta.start_url, // eslint-disable-line camelcase
      inject: false,
      fingerprints: false,
      ios: false,
      includeDirectory: false,
    }),
    // Copy icons and other assets
    new CopyPlugin(siteMeta.copyMeta.map(({from = '', to, name}) => {
      return {
        from: path.join(__dirname, '../public', from, name),
        to,
      }
    })),
    new DuplicatePackageCheckerPlugin({
      // Also show module that is requiring each duplicate package (default: false)
      verbose: true,
      // Emit errors instead of warnings (default: false)
      // emitError: true,
    }),
    // Write sitemap
    new SitemapPlugin(productionHost, [
      {
        path: '/',
        priority: 1,
      },
      {
        path: '/404',
        priority: 0,
      },
    ], {
      // Last update is now
      lastMod: true,
      skipGzip: true,
      fileName: path.join('proxy_to_site_root', 'sitemap.xml'),
    }),
    // Write robots
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      sitemap: path.join(productionHost, 'sitemap.xml'),
      host: productionHost,
      filePath: path.join('proxy_to_site_root', 'robots.txt'),
    }),
  )
}

module.exports = config
