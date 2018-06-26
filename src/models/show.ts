import * as Sequelize from 'sequelize';

interface IShowAttributes {
  VenueId?: number;
  description?: string;
  endsAt?: string;
  startsAt?: string;
  title?: string;
}

type ShowInstance = Sequelize.Instance<IShowAttributes> & IShowAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<IShowAttributes> = {
    VenueId: Sequelize.INTEGER,
    description: Sequelize.STRING,
    endsAt: Sequelize.DATE,
    startsAt: Sequelize.DATE,
    title: Sequelize.STRING,
  };

  const Show = sequelize.define<ShowInstance, IShowAttributes>('Show', attributes);

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
