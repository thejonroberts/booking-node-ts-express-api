import * as Sequelize from 'sequelize';

export interface BandAttributes {
  genreId?: number;
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

  const Band = sequelize.define<BandInstance, BandAttributes>('Band', attributes);

  Band.associate = models => {
    Band.belongsTo(models.Genre, {
      foreignKey: 'genreId',
    });

    Band.belongsToMany(models.User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        through: 'UsersBands',
      });

    Band.belongsToMany(models.Show, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'ShowsBands',
    });
  };

  return Band;
};
