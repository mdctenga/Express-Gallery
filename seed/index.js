var models = require('../models');
var faker = require('faker');

var Photo = models.Photo;

models.sequelize
  .sync({ force: true })
  .then(function () {
    Photo.create({
      author: faker.name.firstName() + faker.name.firstName(),
      description: faker.lorem.paragraph(),
      link: faker.image.city()
    });
    console.log("connected to the database!");
  });

console.log("HELLO WORLD!");