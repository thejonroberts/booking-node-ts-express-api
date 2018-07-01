import * as Sequelize from 'sequelize';

export interface BandAttributes {
  genreId?: number;
  description?: string;
  bandcamp?: string;
  label?: string;
  name?: string;
  tagline?: string;
  website?: string;
}

type BandInstance = Sequelize.Instance<BandAttributes> & BandAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<BandAttributes> = {
    bandcamp: Sequelize.STRING,
    description: Sequelize.STRING,
    genreId: {
      field: 'genre_id',
      type: Sequelize.INTEGER,
    },
    label: Sequelize.STRING,
    name: Sequelize.STRING,
    tagline: Sequelize.STRING,
    website: Sequelize.STRING,
    // TODO: any benefit to declaring this here?
    // http://docs.sequelizejs.com/manual/tutorial/models-definition.html
    // genre_id: {
    //   type: Sequelize.INTEGER,

    //   references: {
    //     // This is a reference to another model
    //     model: Bar,

    //     // This is the column name of the referenced model
    //     key: 'id',

    //     // This declares when to check the foreign key constraint. PostgreSQL only.
    //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    //   }
    // }
  };

  const Band = sequelize.define<BandInstance, BandAttributes>('Band', attributes);

  Band.associate = models => {
    Band.belongsTo(models.Genre, {
      foreignKey: 'genreId',
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
