'use strict';
module.exports = (sequelize, DataTypes) => {
  let Band = sequelize.define(
    'Band',
    {
      GenreId: DataTypes.INTEGER,
      bandcamp: DataTypes.STRING,
      label: DataTypes.STRING,
      name: DataTypes.STRING,
      website: DataTypes.STRING,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
  Band.associate = function(models) {
    Band.belongsTo(models.Genre, {
      foreignKey: 'GenreId',
    });

    Band.belongsToMany(models.User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'UsersBands',
    });

    Band.belongsToMany(models.Event, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'EventsBands',
    });
  };

  return Band;
};
