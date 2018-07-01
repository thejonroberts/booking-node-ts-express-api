import * as Sequelize from 'sequelize';

export interface GenreAttributes {
  name?: string;
}

type GenreInstance = Sequelize.Instance<GenreAttributes> & GenreAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<GenreAttributes> = {
    name: Sequelize.STRING,
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
