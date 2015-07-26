var config = require('./config/config.json');
var express = require('express');
var app = express();

var sequelize = require('sequelize');
var models  = require('./models');

var jade = require('jade');

var bodyParser = require('body-parser');

var methodOverride = require('method-override');

var router  = express.Router();
var morgan = require('morgan');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof  req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    return method;
  }
}));




app.get('/', function(req, res) {
  models.Photo
    .findAll()
    .then(function(photos) {
      res.render('index', {"photos": photos});
    });
});

app.get('/gallery/:id', function(req, res) {
  models.Photo
    .findById(req.params.id)
    .then(function(photo) {

      res.render('display_photo', {"photo": photo});
    });
});

app.put('/gallery/:id', function (req, res) {
  models.Photo
    .findById(req.params.id)
    .then(function(photo) {
      return photo.updateAttributes({
        author: req.body.author,
        description: req.body.description,
        link: req.body.link
      });
    })
    .then(function() {
      res.redirect('/gallery/' + req.params.id);
    });
});

app.delete('/gallery/:id', function (req,res) {
  models.Photo
    .findById(req.params.id)
    .then(function(photo) {
      return photo.destroy(photo);
    })
    .then(function() {
      res.redirect('/');
    });
});

app.get('/new_photo', function (req, res) {
  res.render('new_photo');
});

app.get('/gallery/:id/edit', function (req, res) {
  res.render('edit_photo');
});

module.exports = router;

app.post('/gallery', function (req, res) {
  // console.log(req.body);
  models.Photo.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
  .then(function(newPhoto) {
    res.redirect('/gallery/' + newPhoto.id);  });
  // res.send('Photo was successfully create and is in the database!');
});


var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});