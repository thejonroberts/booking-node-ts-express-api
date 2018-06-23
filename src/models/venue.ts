import { DataTypes, Sequelize } from 'sequelize';
module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Venue = sequelize.define(
    'Venue',
    {
      AddressId: dataTypes.INTEGER,
      name: dataTypes.STRING,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  Venue.associate = models => {
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
