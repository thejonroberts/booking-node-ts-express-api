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

  const Genre = sequelize.define<GenreInstance, GenreAttributes>('Genre', attributes);

  Genre.associate = models => {
    Genre.hasMany(models.Band, {
      foreignKey: 'genreId',
    });

    Genre.belongsToMany(models.Venue, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'VenuesGenres',
    });
  };

  return Genre;
};
