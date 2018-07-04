import * as Sequelize from 'sequelize';

export interface BandAttributes {
  id?: number;
  genreId?: number;
  addressId?: number;
  description?: string;
  bandcamp?: string;
  label?: string;
  name?: string;
  tagline?: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

type BandInstance = Sequelize.Instance<BandAttributes> & BandAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<BandAttributes> = {
    addressId: {
      field: 'address_id',
      type: Sequelize.INTEGER,
    },
    bandcamp: Sequelize.STRING,
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      type: Sequelize.DATE,
    },
    description: Sequelize.STRING,
    genreId: {
      field: 'genre_id',
      // TODO: any benefit to declaring this here?
      // need to import other Model - better to just use associations???
      // http://docs.sequelizejs.com/manual/tutorial/models-definition.html
      // references: {
      //   key: 'id',
      //   model: Genre,
      // },
      type: Sequelize.INTEGER,
    },
    label: Sequelize.STRING,
    name: Sequelize.STRING,
    tagline: Sequelize.STRING,
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
    website: Sequelize.STRING,
  };

  const options = {
    name: {
      plural: 'bands',
      singular: 'band',
    },
  };

  const Band = sequelize.define<BandInstance, BandAttributes>('Band', attributes, options);

  Band.associate = models => {
    Band.belongsTo(models.Genre, {
      foreignKey: 'genreId',
    });

    Band.belongsTo(models.Address, {
      foreignKey: 'addressId',
    });

    Band.belongsToMany(models.User, {
      // as: 'members',
      foreignKey: 'band_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      otherKey: 'user_id',
      through: 'Members',
    });

    Band.belongsToMany(models.Show, {
      foreignKey: 'band_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      otherKey: 'show_id',
      through: 'Lineups',
    });
  };

  return Band;
};
