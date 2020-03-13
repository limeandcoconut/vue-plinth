module.exports = {
  apps: [{
    name: 'js',
    script: 'server/serve.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M', // eslint-disable-line camelcase
    env: {
      NODE_ENV: 'production',
    },
  }],
}
