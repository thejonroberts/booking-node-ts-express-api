'use strict';
module.exports = (sequelize, DataTypes) => {
  let Genre = sequelize.define(
    'Genre',
    {
      name: DataTypes.STRING,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  Genre.associate = function(models) {
    Genre.hasMany(models.Band, {
      foreignKey: 'GenreId',
    });

    Genre.belongsToMany(models.Venue, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'VenuesGenres',
    });
  };
  return Genre;
};
