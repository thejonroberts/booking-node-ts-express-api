'use strict';
module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define(
    'Address',
    {
      street: DataTypes.STRING,
      streetTwo: DataTypes.STRING,
      city: DataTypes.STRING,
      stateCode: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      timeZone: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return Address;
};
