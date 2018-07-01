import * as Sequelize from 'sequelize';

export interface AddressAttributes {
  id?: string;
  city?: string;
  country?: string;
  placeId?: number;
  state?: string;
  street?: string;
  lineOne?: string;
  timeZone?: string;
  zipCode?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

type AddressInstance = Sequelize.Instance<AddressAttributes> & AddressAttributes;

// TODO: no default exports
export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<AddressAttributes> = {
    city: Sequelize.STRING,
    country: Sequelize.STRING,
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      type: Sequelize.DATE,
    },
    lineOne: {
      field: 'line_one',
      type: Sequelize.STRING,
    },
    placeId: {
      field: 'place_id',
      type: Sequelize.INTEGER,
    },
    state: Sequelize.STRING,
    street: Sequelize.STRING,
    timeZone: {
      field: 'time_zone',
      type: Sequelize.STRING,
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
    zipCode: {
      field: 'zip_code',
      type: Sequelize.STRING,
    },

  };

  const Address = sequelize.define<AddressInstance, AddressAttributes>('Address', attributes);

  Address.associate = models => {
    Address.hasMany(models.Venue, {
      foreignKey: 'addressId',
    });
  };

  return Address;
};
