import { DataTypes, Sequelize } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      AddressId: dataTypes.INTEGER,
      email: dataTypes.STRING,
      firstName: dataTypes.STRING,
      lastLoginDate: dataTypes.DATE,
      lastName: dataTypes.STRING,
      password: dataTypes.STRING,
      phoneNumber: dataTypes.STRING,
      username: dataTypes.TEXT,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  User.associate = models => {
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
