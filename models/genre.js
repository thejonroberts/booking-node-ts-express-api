'use strict';
module.exports = (sequelize, DataTypes) => {
  let Genre = sequelize.define(
    'Genre',
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  Genre.associate = function(models) {
    Genre.hasMany(models.Band, {
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
