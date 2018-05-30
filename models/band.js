'use strict';
module.exports = function(sequelize, DataTypes) {
  var Band = sequelize.define(
    'Band',
    {
      name: DataTypes.STRING,
      bandcamp: DataTypes.STRING,
      website: DataTypes.STRING,
      label: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  Band.associate = models => {
		Band.belongsTo(models.Genre, {
			foreignKey: 'GenreId',
    });

    Band.belongsToMany(models.User, {
      through: 'UsersBands',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });


	};

  return Band;
};
