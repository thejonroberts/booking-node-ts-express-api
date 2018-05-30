'use strict';
module.exports = (sequelize, DataTypes) => {
  var Genre = sequelize.define('Genre', {
    name: DataTypes.STRING,
  }, {});
  Genre.associate = function(models) {
    Genre.belongsTo(models.Band, {
			foreignKey: 'GenreId',
    });

    Genre.belongsToMany(models.Venue, {
      through: 'VenuesGenres',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Genre;
};
