const path = require('path')
const crypto = require('crypto')
const express = require('express')
const expressStaticGzip = require('express-static-gzip')
const fallback = require('express-history-api-fallback')
const featurePolicy = require('feature-policy')
const csp = require('helmet-csp')
const frameguard = require('frameguard')
// const hsts = require('hsts')
const ieNoOpen = require('ienoopen')
const noSniff = require('dont-sniff-mimetype')
const xssFilter = require('x-xss-protection')

const { frontendPort } = require('../config/config.js')

const isDevelopment = (process.env.NODE_ENV === 'development')
const app = express()
let compiler
// In prod this will be done by HAProxy via rewrites
if (isDevelopment) {
  console.log('Running in development mode!')
  // The caching service worker must be loaded from / to be allowed to cache everything necessary
  app.use('/service-worker.js', express.static(path.resolve(__dirname, '../dist/proxy_to_site_root/service-worker.js')))

  compiler = require('./hmr.js')(app)

} else {
  // Don't bother with security on dev
  // Setup feature policy
  const contentNone = ['\'none\'']
  app.use(featurePolicy({
    features: {
      camera: [...contentNone],
      geolocation: [...contentNone],
      microphone: [...contentNone],
      payment: [...contentNone],
    },
  }))

  // Generate a 128 bit pseudo random base 64 nonce
  // https://www.w3.org/TR/CSP2/#nonce_value
  app.use((request, response, next) => {
    response.locals.nonce = crypto.randomBytes(16).toString('base64')
    next()
  })

  // Set up content-security-policy
  // Keep this url in sync with config.js and meta.config.js
  const contentSelf = ['\'self\'', 'vue-plinth.jacobsmith.tech', 'blob:', 'data:']
  const contentAnalytics = ['*.google-analytics.com', 'google-analytics.com']
  const contentFonts = ['*.fonts.gstatic.com', 'fonts.gstatic.com']
  app.use(csp({
    directives: {
      defaultSrc: [...contentSelf, ...contentAnalytics],
      scriptSrc: [
        ...contentSelf,
        ...contentAnalytics,
        (request, response) => `'nonce-${response.locals.nonce}'`,
      ],
      styleSrc: [...contentSelf, '\'unsafe-inline\''],
      fontSrc: [...contentSelf, ...contentFonts],
      imgSrc: [...contentSelf, ...contentAnalytics],
      prefetchSrc: [...contentSelf, ...contentFonts],
      connectSrc: [...contentSelf, ...contentAnalytics, ...contentFonts],
      // TODO: Add a report URI if you like
      // reportUri
    },
  }))

  // Prevent iframes embedding this page
  app.use(frameguard({ action: 'deny' }))
  // Hide express
  app.disable('x-powered-by')

  // Set up hsts
  // Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains".
  // const sixtyDaysInSeconds = 5184000
  // app.use(hsts({
  //   maxAge: sixtyDaysInSeconds
  // }))

  // Used for an old ie thing
  app.use(ieNoOpen())
  // Don't sniff mimetype
  app.use(noSniff())

  // Prevent xss reflection
  // Sets "X-XSS-Protection: 1; mode=block".
  app.use(xssFilter())
  // TODO: Add reporting
  // app.use(xssFilter({ reportUri: '/report-xss-violation' }))
}

// Serve any static files in public
// Could also replace with nginx if there's a need
// Currentluy fonts are the only thing not otherwise accessible
app.use('/', expressStaticGzip(path.resolve(__dirname, '../', 'public'), {
  enableBrotli: true,
  index: false,
  orderPreference: ['br'],
}))

// Serve compiled resources
app.use('/dist/', expressStaticGzip(path.resolve(__dirname, '../', 'dist'), {
  enableBrotli: true,
  index: false,
  orderPreference: ['br'],
  serveStatic: {
    setHeaders (response, path) {
      // For best results manifest.json must be served with application/manifest+json
      if (/\/dist\/manifest\.json\W?/.test(path)) {
        response.set('Content-Type', 'application/manifest+json; charset=UTF-8')
      }
    },
  },
}))

if (isDevelopment) {
  app.use('*', (request, response, next) => {
    let filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, function (error, result) {
      if (error) {
        return next(error)
      }
      response.set('content-type', 'text/html')
      response.send(result)
      response.end()
    })
  })
} else {

  app.use(fallback('index.html', {
    root: path.resolve(__dirname, '../', 'dist'),
  }))
}

app.listen(frontendPort, (error) => {
  if (error) {
    throw error
  }
  console.log(`Running in ${process.env.NODE_ENV} mode`)
  console.log(`Listening on port ${frontendPort}`)
})
