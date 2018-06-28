import * as Sequelize from 'sequelize';

export interface BandAttributes {
  GenreId?: number;
  bandcamp?: string;
  label?: string;
  name?: string;
  website?: string;
}

type BandInstance = Sequelize.Instance<BandAttributes> & BandAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<BandAttributes> = {
    GenreId: Sequelize.INTEGER,
    bandcamp: Sequelize.STRING,
    label: Sequelize.STRING,
    name: Sequelize.STRING,
    website: Sequelize.STRING,
  };

  const Band = sequelize.define<BandInstance, BandAttributes>('Band', attributes);

  Band.associate = models => {
    Band.belongsTo(models.Genre, {
      foreignKey: 'GenreId',
    });

    Band.belongsToMany(models.User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        through: 'UsersBands',
      });

    Band.belongsToMany(models.Show, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'ShowsBands',
    });
  };

  return Band;
};
