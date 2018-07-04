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
    city: {
      defaultValue: '',
      type: Sequelize.STRING,
    },
    country: {
      defaultValue: '',
      type: Sequelize.STRING,
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      type: Sequelize.DATE,
    },
    lineOne: {
      defaultValue: '',
      field: 'line_one',
      type: Sequelize.STRING,
    },
    placeId: {
      defaultValue: null,
      field: 'place_id',
      type: Sequelize.INTEGER,
    },
    state: {
      defaultValue: '',
      type: Sequelize.STRING,
    },
    street: {
      defaultValue: '',
      type: Sequelize.STRING,
    },
    timeZone: {
      defaultValue: '',
      field: 'time_zone',
      type: Sequelize.STRING,
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
    zipCode: {
      defaultValue: '',
      field: 'zip_code',
      type: Sequelize.STRING,
    },

  };

  const options = {
    name: {
      plural: 'addresses',
      singular: 'address',
    },
  };

  const Address = sequelize.define<AddressInstance, AddressAttributes>('Address', attributes, options);

  Address.associate = models => {
    Address.hasMany(models.Venue, {
      foreignKey: 'address_id',
    });
  };

  return Address;
};
