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
      allowNull: false,
      field: 'address_id',
      type: Sequelize.INTEGER,
      // references: {
      //   key: 'id',
      //   model: Address,
      // },
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.STRING,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    tagline: Sequelize.STRING,
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
  };

  const options = {
    name: {
      plural: 'venues',
      singular: 'venue',
    },
  };

  const Venue = sequelize.define<VenueInstance, VenueAttributes>('Venue', attributes, options);

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
      otherKey: 'genre_id',
      through: 'VenuesGenres',
    });

    Venue.belongsToMany(models.User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      otherKey: 'user_id',
      through: 'Employees',
    });
  };

  return Venue;
};
