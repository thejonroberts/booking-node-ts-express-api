import * as Sequelize from 'sequelize';

export interface ShowAttributes {
  venueId?: number;
  description?: string;
  endsAt?: string;
  startsAt?: string;
  title?: string;
}

type ShowInstance = Sequelize.Instance<ShowAttributes> & ShowAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<ShowAttributes> = {
    description: Sequelize.STRING,
    endsAt: {
      field: 'ends_at',
      type: Sequelize.DATE,
    },
    startsAt: {
      field: 'starts_at',
      type: Sequelize.DATE,
    },
    title: Sequelize.STRING,
    venueId: {
      field: 'venue_id',
      type: Sequelize.INTEGER,
    },
  };

  const Show = sequelize.define<ShowInstance, ShowAttributes>('Show', attributes);

  Show.associate = models => {
    // TODO: this isn't working
    Show.belongsTo(models.Venue, {
      foreignKey: 'venueId',
    });

    Show.belongsToMany(models.Band, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'Lineups',
    });
  };

  return Show;
};
