import * as Sequelize from 'sequelize';

export interface VenueAttributes {
  addressId?: number;
  description?: number;
  name?: string;
  tagline?: string;
}

type VenueInstance = Sequelize.Instance<VenueAttributes> & VenueAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<VenueAttributes> = {
    addressId: {
      field: 'address_id',
      type: Sequelize.INTEGER,
    },
    description: Sequelize.STRING,
    name: Sequelize.STRING,
    tagline: Sequelize.STRING,
  };

  const Venue = sequelize.define<VenueInstance, VenueAttributes>('Venue', attributes);

  Venue.associate = models => {
    Venue.hasMany(models.Show, {
      foreignKey: 'venueId',
    });

    Venue.belongsTo(models.Address, {
      foreignKey: 'addressId',
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
