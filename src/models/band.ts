import * as Sequelize from 'sequelize';

interface IBandAttributes {
  GenreId?: number;
  bandcamp?: string;
  label?: string;
  name?: string;
  website?: string;
}

type BandInstance = Sequelize.Instance<IBandAttributes> & IBandAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<IBandAttributes> = {
    GenreId: Sequelize.INTEGER,
    bandcamp: Sequelize.STRING,
    label: Sequelize.STRING,
    name: Sequelize.STRING,
    website: Sequelize.STRING,
  };

  const Band = sequelize.define<BandInstance, IBandAttributes>('Band', attributes);

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
