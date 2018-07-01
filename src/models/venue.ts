import * as Sequelize from 'sequelize';

export interface VenueAttributes {
  addressId?: number;
  description?: string;
  name?: string;
  tagline?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

type VenueInstance = Sequelize.Instance<VenueAttributes> & VenueAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<VenueAttributes> = {
    addressId: {
      field: 'address_id',
      type: Sequelize.INTEGER,
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      type: Sequelize.DATE,
    },
    description: Sequelize.STRING,
    name: Sequelize.STRING,
    tagline: Sequelize.STRING,
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
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
      through: 'Employees',
    });
  };

  return Venue;
};
