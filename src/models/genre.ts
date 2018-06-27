import * as Sequelize from 'sequelize';

interface GenreAttributes {
  name?: string;
}

type GenreInstance = Sequelize.Instance<GenreAttributes> & GenreAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<GenreAttributes> = {
    name: Sequelize.STRING,
  };

  const Genre = sequelize.define<GenreInstance, GenreAttributes>('Genre', attributes);

  // {
  //   "error": {
  //     "name": "SequelizeEagerLoadingError"
  //   }
  // }
  Genre.associate = models => {
    Genre.hasMany(models.Band, {
      foreignKey: 'GenreId',
    });

    Genre.belongsToMany(models.Venue, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'VenuesGenres',
    });
  };

  return Genre;
};
