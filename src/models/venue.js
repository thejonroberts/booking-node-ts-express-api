'use strict';
module.exports = (sequelize, DataTypes) => {
  let Venue = sequelize.define(
    'Venue',
    {
      AddressId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  Venue.associate = function(models) {
    Venue.belongsToMany(models.Genre, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'VenuesGenres',
    });

    Venue.hasMany(models.Event, {
      foreignKey: 'VenueId',
    });

    Venue.belongsTo(models.Address, {
      foreignKey: 'AddressId',
    });

    Venue.belongsToMany(models.User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'UsersVenues',
    });
  };
  return Venue;
};
