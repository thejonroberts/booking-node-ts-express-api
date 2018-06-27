import * as Sequelize from 'sequelize';

interface AddressAttributes {
  id?: string;
  city?: string;
  placeId?: number;
  stateCode?: string;
  street?: string;
  streetTwo?: string;
  timeZone?: string;
  zipCode?: number;
}

type AddressInstance = Sequelize.Instance<AddressAttributes> & AddressAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<AddressAttributes> = {
    city: Sequelize.STRING,
    placeId: Sequelize.INTEGER,
    stateCode: Sequelize.STRING,
    street: Sequelize.STRING,
    streetTwo: Sequelize.STRING,
    timeZone: Sequelize.STRING,
    zipCode: Sequelize.STRING,
  };

  const Address = sequelize.define<AddressInstance, AddressAttributes>('Address', attributes);

  Address.associate = models => {
    Address.hasMany(models.User, {
      foreignKey: 'AddressId',
    });

    Address.hasMany(models.Venue, {
      foreignKey: 'AddressId',
    });
  };

  return Address;
};
