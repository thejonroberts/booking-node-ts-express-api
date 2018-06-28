import * as Sequelize from 'sequelize';

export interface UserAttributes {
  AddressId?: number;
  email?: string;
  firstName?: string;
  lastLoginDate?: string;
  lastName?: string;
  password?: string;
  phoneNumber?: string;
  username?: string;
}

type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<UserAttributes> = {
    AddressId: Sequelize.INTEGER,
    email: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastLoginDate: Sequelize.DATE,
    lastName: Sequelize.STRING,
    password: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    username: Sequelize.TEXT,
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  User.associate = models => {
    User.hasOne(models.Address, {
      foreignKey: 'id',
    });

    User.belongsToMany(models.Band, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'UsersBands',
    });

    User.belongsToMany(models.Venue, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      through: 'UsersVenues',
    });
  };

  return User;
};
