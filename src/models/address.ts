import { DataTypes, Sequelize } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      city: dataTypes.STRING,
      placeId: dataTypes.INTEGER,
      stateCode: dataTypes.STRING,
      street: dataTypes.STRING,
      streetTwo: dataTypes.STRING,
      timeZone: dataTypes.STRING,
      zipCode: dataTypes.STRING,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
  Address.associate = models => {
    Address.hasMany(models.User, {
      foreignKey: 'AddressId',
    });

    Address.hasMany(models.Venue, {
      foreignKey: 'AddressId',
    });
  };
  return Address;
};
