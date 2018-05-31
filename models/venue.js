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
    Venue.belongsTo(models.Genre, {
      foreignKey: 'GenreId',
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
