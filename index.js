var express = require('express');
var path = require('path');
var app = express();
 
app.use(express.static(path.join(__dirname, 'public')));
 
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("address is http://%s:%s", host, port)
})