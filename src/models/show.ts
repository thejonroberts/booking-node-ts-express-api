import * as Sequelize from 'sequelize';

export interface ShowAttributes {
  venueId?: number;
  description?: string;
  endsAt?: string;
  startsAt?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

type ShowInstance = Sequelize.Instance<ShowAttributes> & ShowAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<ShowAttributes> = {
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      type: Sequelize.DATE,
    },
    description: {
      defaultValue: '',
      type: Sequelize.STRING,
    },
    endsAt: {
      defaultValue: null,
      field: 'ends_at',
      type: Sequelize.DATE,
    },
    startsAt: {
      defaultValue: null,
      field: 'starts_at',
      type: Sequelize.DATE,
    },
    title: {
      allowNull: false,
      defaultValue: '',
      type: Sequelize.STRING,
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
    venueId: {
      field: 'venue_id',
      type: Sequelize.INTEGER,
      // references: {
      //   key: 'id',
      //   model: Venue,
      // },
    },
  };

  const options = {
    name: {
      plural: 'shows',
      singular: 'show',
    },
  };

  const Show = sequelize.define<ShowInstance, ShowAttributes>('Show', attributes, options);

  Show.associate = models => {
    // TODO: this isn't working
    Show.belongsTo(models.Venue, {
      foreignKey: 'venueId',
    });

    Show.belongsToMany(models.Band, {
      foreignKey: 'show_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      otherKey: 'band_id',
      through: 'Lineups',
    });
  };

  return Show;
};
