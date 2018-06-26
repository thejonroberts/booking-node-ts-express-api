import * as Sequelize from 'sequelize';

interface IEventAttributes {
  VenueId?: number;
  description?: string;
  endsAt?: string;
  startsAt?: string;
  title?: string;
}

type EventInstance = Sequelize.Instance<IEventAttributes> & IEventAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<IEventAttributes> = {
    VenueId: Sequelize.INTEGER,
    description: Sequelize.STRING,
    endsAt: Sequelize.DATE,
    startsAt: Sequelize.DATE,
    title: Sequelize.STRING,
  };

  const Event = sequelize.define<EventInstance, IEventAttributes>('Event', attributes);

  Event.associate = models => {
    // TODO: this isn't working
    Event.belongsTo(models.Venue, {
      foreignKey: 'VenueId',
    });

    Event.belongsToMany(models.Band, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'EventsBands',
    });
  };

  return Event;
};
