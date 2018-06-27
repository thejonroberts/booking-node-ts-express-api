import * as Sequelize from 'sequelize';

interface VenueAttributes {
  AddressId?: number;
  name?: string;
}

type VenueInstance = Sequelize.Instance<VenueAttributes> & VenueAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<VenueAttributes> = {
    AddressId: Sequelize.INTEGER,
    name: Sequelize.STRING,
  };

  const Venue = sequelize.define<VenueInstance, VenueAttributes>('Venue', attributes);

  Venue.associate = models => {
    Venue.hasMany(models.Show, {
      foreignKey: 'VenueId',
    });

    Venue.belongsTo(models.Address, {
      foreignKey: 'AddressId',
    });

    Venue.belongsToMany(models.Genre, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'VenuesGenres',
    });

    Venue.belongsToMany(models.User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'UsersVenues',
    });
  };

  return Venue;
};
