import * as Sequelize from 'sequelize';

export interface GenreAttributes {
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

type GenreInstance = Sequelize.Instance<GenreAttributes> & GenreAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<GenreAttributes> = {
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      type: Sequelize.DATE,
    },
    name: Sequelize.STRING,
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
  };

  const options = {
    name: {
      plural: 'genres',
      singular: 'genre',
    },
  };

  const Genre = sequelize.define<GenreInstance, GenreAttributes>('Genre', attributes, options);

  Genre.associate = models => {
    // TODO: need this?
    // Genre.hasMany(models.Band, {
    //   foreignKey: 'genreId',
    // });

    Genre.belongsToMany(models.Venue, {
      foreignKey: 'genre_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      otherKey: 'venue_id',
      through: 'VenuesGenres',
    });
  };

  return Genre;
};
