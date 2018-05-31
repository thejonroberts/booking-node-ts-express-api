'use strict';
module.exports = (sequelize, DataTypes) => {
  var Venue = sequelize.define(
    'Venue',
    {
      name: DataTypes.STRING,
      AddressId: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  Venue.associate = function(models) {
    Venue.belongsToMany(models.Genre, {
      through: 'VenuesGenres',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Venue.belongsTo(models.Address, {
      foreignKey: 'AddressId',
    });

    Venue.belongsToMany(models.User, {
      through: 'UsersVenues',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Venue;
};
