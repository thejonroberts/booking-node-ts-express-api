import { DataTypes, Sequelize } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Genre = sequelize.define(
    'Genre',
    {
      name: dataTypes.STRING,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

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
