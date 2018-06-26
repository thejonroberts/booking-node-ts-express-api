import * as Sequelize from 'sequelize';

interface IGenreAttributes {
  name?: string;
}

type GenreInstance = Sequelize.Instance<IGenreAttributes> & IGenreAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<IGenreAttributes> = {
    name: Sequelize.STRING,
  };

  const Genre = sequelize.define<GenreInstance, IGenreAttributes>('Genre', attributes);

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
