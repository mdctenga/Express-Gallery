var config = require('./config/config.json');
var express = require('express');
var app = express();
var sequelize = require('sequelize');

var jade = require('jade');
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render("index");
});

app.post('/', function (req, res) {
  res.send('Got a POST request');
});

var server = app.listen(config.development.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});