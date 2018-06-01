'use strict';
<<<<<<< HEAD

=======
>>>>>>> master
module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define(
    'Address',
    {
      street: DataTypes.STRING,
      streetTwo: DataTypes.STRING,
      city: DataTypes.STRING,
      stateCode: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      timeZone: DataTypes.STRING,
      placeId: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      paranoid: true,
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
