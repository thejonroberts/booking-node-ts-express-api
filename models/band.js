'use strict';

module.exports = (sequelize, DataTypes) => {
  var Band = sequelize.define(
    'Band',
    {
      name: DataTypes.STRING,
      bandcamp: DataTypes.STRING,
      website: DataTypes.STRING,
      label: DataTypes.STRING,
      GenreId: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  Band.associate = function(models) {
    Band.belongsTo(models.Genre, {
      foreignKey: 'GenreId',
    });

    Band.belongsToMany(models.User, {
      through: 'UsersBands',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Band.belongsToMany(models.Event, {
      through: 'EventsBands',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Band;
};
