module.exports = TownshipAccounts;

function TownshipAccounts (opts) {
  if (!(this instanceof TownshipAccounts)) return new TownshipAccounts(opts)
  opts = opts || { site: { title: 'TownshipAccounts' }, port: 4444 }
  var self = this;

  var level = require('level')
  var db = level(__dirname + '/db')
  var accounts = require('accounts-api')(db)
  var response = require('response')
    
  var http = require('http')

  var cb = function () {
    console.log('server listening at http://localhost:' + opts.port)
  }
  var httpServer = http.createServer(function (req, res) {
    if (!accounts.serve(req, res)) {
      console.log("not a matching route! req.url:", req.url)
      return response().json({ message: 'Invalid route: ' + req.url }).pipe(res)
    }
  })

  httpServer.listen(opts.port, cb)

  return httpServer
}

TownshipAccounts(require('./config.js'))

