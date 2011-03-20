var
  path = require('path'),
  http = require('http'),
  paperboy = require('paperboy'),

  PORT = 8341,
  WEBROOT = "/Users/dalsgaard/Development/GeekNight/Html5/Sources";

http.createServer(function(req, res) {
  var ip = req.connection.remoteAddress;
  paperboy
    .deliver(WEBROOT, req, res)
    .before(function() {
      console.log('Received Request');
    })
    .error(function(statCode, msg) {
      res.writeHead(statCode, {'Content-Type': 'text/plain'});
      res.end("Error " + statCode);
    })
    .otherwise(function(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("Error 404: File not found");
    });
}).listen(PORT);
