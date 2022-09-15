module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Auto inject specific core-js and runtime imports where the
        // polyfillable features are used.
        // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
        useBuiltIns: 'usage',
        modules: false,
        corejs: '3.9.1',
      },
    ],
  ],
  // These are necessary for useBuiltIns: 'usage' to work properly
  // 'Consider the file a "module" if import/export statements are present, or
  // else consider it a "script"'
  // https://babeljs.io/docs/en/options#sourcetype
  sourceType: 'unambiguous',
  // Don't let babel intect core-js references into core-js
  // https://stackoverflow.com/questions/52407499/how-do-i-use-babels-usebuiltins-usage-option-on-the-vendors-bundle
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

