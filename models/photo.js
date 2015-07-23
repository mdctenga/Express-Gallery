'use strict';
module.exports = function(sequelize, DataTypes) {
  var photo = sequelize.define('photo', {
    author: DataTypes.TEXT,
    description: DataTypes.TEXT,
    link: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return photo;
};