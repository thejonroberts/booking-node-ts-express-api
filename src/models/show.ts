import * as Sequelize from 'sequelize';

export interface ShowAttributes {
  VenueId?: number;
  description?: string;
  endsAt?: string;
  startsAt?: string;
  title?: string;
}

type ShowInstance = Sequelize.Instance<ShowAttributes> & ShowAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<ShowAttributes> = {
    VenueId: Sequelize.INTEGER,
    description: Sequelize.STRING,
    endsAt: Sequelize.DATE,
    startsAt: Sequelize.DATE,
    title: Sequelize.STRING,
  };

  const Show = sequelize.define<ShowInstance, ShowAttributes>('Show', attributes);

  Show.associate = models => {
    // TODO: this isn't working
    Show.belongsTo(models.Venue, {
      foreignKey: 'VenueId',
    });

    Show.belongsToMany(models.Band, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'ShowsBands',
    });
  };

  return Show;
};
