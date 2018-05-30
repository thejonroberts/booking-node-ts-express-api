'use strict';
module.exports = function(sequelize, DataTypes) {
  var Venue = sequelize.define(
    'Venue',
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  Venue.associate = models => {
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
