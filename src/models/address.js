'use strict';
module.exports = (sequelize, DataTypes) => {
  let Address = sequelize.define(
    'Address',
    {
      city: DataTypes.STRING,
      placeId: DataTypes.INTEGER,
      stateCode: DataTypes.STRING,
      street: DataTypes.STRING,
      streetTwo: DataTypes.STRING,
      timeZone: DataTypes.STRING,
      zipCode: DataTypes.STRING,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
  Address.associate = function(models) {
    Address.hasMany(models.User, {
      foreignKey: 'AddressId',
    });

    Address.hasMany(models.Venue, {
      foreignKey: 'AddressId',
    });
  };
  return Address;
};
