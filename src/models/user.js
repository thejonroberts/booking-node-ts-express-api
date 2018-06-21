'use strict';
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define(
    'User',
    {
      AddressId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastLoginDate: DataTypes.DATE,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      username: DataTypes.TEXT,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  User.associate = function(models) {
    User.hasOne(models.Address, {
      foreignKey: 'id',
    });

    User.belongsToMany(models.Band, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'UsersBands',
    });

    User.belongsToMany(models.Venue, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'UsersVenues',
    });
  };
  return User;
};
