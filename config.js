var extend = require('extend')
var env = require('node-env-file')

// If we have a .env file, use those environment variables instead:
try {
  env('.env', { overwrite: true })
} catch (err) {
  if (err.name !== 'TypeError' || err.message.lastIndexOf('Environment', 0) === -1) {
    throw err
  }
}

var config = {
  shared: {
    site: {
      title: 'TownshipAccounts'
    },
    port: process.env.PORT,
    secret: process.env.SECRET
  },
  production: {},
  development: {}
}


module.exports = extend(config.shared, config[process.env.NODE_ENV])
