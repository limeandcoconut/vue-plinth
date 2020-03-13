const description = 'Full Stack Web Developer, Check out my Github or email me. 🍻' // eslint-diable-line max-len
const color = '#D01420'
const source = 'https://jacobsmith.tech/images/logo-og.png'
// NOTE: This file is included in client. Don't put secrets in here. They go in keys.js

const siteMeta = {
  name: 'Jacob Smith',
  short_name: 'JS', // eslint-disable-line camelcase
  title: 'Jacob Smith | JavaScript Fungineer',
  author: 'Jacob Smith',
  display: 'standalone',
  start_url: '/', // eslint-disable-line camelcase
  // Keep in sync with config.js
  host: 'https://jacobsmith.tech',
  description,
  color,
  og: {
    description,
    image: {
      src: source,
      width: '1200',
      height: '628',
    },
    type: 'website',
  },
  twitter: {
    creator: '@limeandcoconut',
    image: {
      src: source,
      alt: 'A play off of the JavaScript logo using my color scheme and the font Rubik. J.S. are my initials.',
    },
    card: 'summary_large_image',
  },
  ms: {
    color,
  },
  manifest: '/dist/manifest.json',
  favicons: [
    {
      src: '/favicon.ico',
      key: 'default',
    },
    {
      src: '/dist/meta/favicon-32x32.png',
      key: 'x32',
    },
    {
      src: '/dist/meta/favicon-16x16.png',
      key: 'x16',
    },
    {
      src: '/dist/meta/mstile-150x150.png',
      key: 'ms',
    },
    {
      src: '/dist/meta/apple-touch-icon.png',
      key: 'apple',
    },
    {
      src: '/dist/meta/safari-pinned-tab.svg',
      key: 'safariMask',
    },
  ],
  // These are joined with paths.sharedMeta in webpack so that
  // path, paths, and subsequently fs are not included on client where this is used
  // This is used by webpack to copy assets which aren't required in
  copyMeta: [
    {
      name: '/favicon.ico',
      from: 'icons',
      to: 'proxy_to_site_root/',
    },
    {
      name: '/favicon-32x32.png',
      from: 'icons',
      to: 'meta',
    },
    {
      name: '/favicon-16x16.png',
      from: 'icons',
      to: 'meta',
    },
    {
      name: '/mstile-150x150.png',
      from: 'icons',
      to: 'meta',
    },
    {
      name: '/apple-touch-icon.png',
      from: 'icons',
      to: 'meta',
    },
    {
      name: '/safari-pinned-tab.svg',
      from: 'icons',
      to: 'meta',
    },
    {
      name: '/logo-og.png',
      from: 'images',
      to: 'meta',
    },
    {
      name: '/browserconfig.xml',
      from: 'icons',
      to: 'proxy_to_site_root/',
    },
  ],
  // Used in asset generation
  manifestIcons: [
    {
      src: '/android-chrome-512x512.png',
      sizes: [72, 96, 128, 144, 152, 192, 384, 512],
      destination: '/meta',
    },
  ],
  // Wonder if it would be worth pulling from package.json
  cacheBust: '?v=0',
}

// Cache cacheBust
// C-C-C-COMBO BREAKER!
siteMeta.favicons = siteMeta.favicons.reduce((favicons, {key, src: source}) => {
  favicons[key] = source + siteMeta.cacheBust
  return favicons
}, {})
siteMeta.manifest += siteMeta.cacheBust
siteMeta.twitter.image.src += siteMeta.cacheBust
siteMeta.og.image.src += siteMeta.cacheBust

module.exports = siteMeta
