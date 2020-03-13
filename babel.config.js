module.exports = {
  compact: true,
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        modules: false,
        corejs: '3.0.0',
      },
    ],
  ],
  // These seeem to be necessary for useBuiltIns: 'usgae' to work properly
  sourceType: 'unambiguous',
  ignore: [/[/\\]core-js/, /@babel[/\\]runtime/],

  plugins: [
    // Some really nice proposals
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',

    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
  ],
}

