import { DataTypes, Sequelize } from 'sequelize';

module.exports = (sequelize: Sequelize, dataTypes: DataTypes) => {
  const Band = sequelize.define(
    'Band',
    {
      GenreId: dataTypes.INTEGER,
      bandcamp: dataTypes.STRING,
      label: dataTypes.STRING,
      name: dataTypes.STRING,
      website: dataTypes.STRING,
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
  Band.associate = models => {
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
