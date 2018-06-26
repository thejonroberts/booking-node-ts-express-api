import * as Sequelize from 'sequelize';

interface IVenueAttributes {
  AddressId?: number;
  name?: string;
}

type VenueInstance = Sequelize.Instance<IVenueAttributes> & IVenueAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<IVenueAttributes> = {
    AddressId: Sequelize.INTEGER,
    name: Sequelize.STRING,
  };

  const Venue = sequelize.define<VenueInstance, IVenueAttributes>('Venue', attributes);

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
