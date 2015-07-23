var config = require('./config/config.json');
var express = require('express');
var app = express();
var sequelize = require('sequelize');

var jade = require('jade');

var bodyParser = require('body-parser');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}));
// app.use(methodOverride(function(req, res, next){
//   if (req.body && typeof  req.body === 'object' && '_method' in req.body) {
//     var method = req.body._method;
//     return method;
//   }
//   next();
// }));

app.get('/new_photo', function (req, res) {
  res.render("new_photo");
});

app.post('/gallery', function (req, res) {
  console.log(req.body);
  res.send('Got a POST request');
});

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});