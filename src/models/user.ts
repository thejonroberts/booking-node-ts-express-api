import * as Sequelize from 'sequelize';

interface IUserAttributes {
  AddressId?: number;
  email?: string;
  firstName?: string;
  lastLoginDate?: string;
  lastName?: string;
  password?: string;
  phoneNumber?: string;
  username?: string;
}

type UserInstance = Sequelize.Instance<IUserAttributes> & IUserAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<IUserAttributes> = {
    AddressId: Sequelize.INTEGER,
    email: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastLoginDate: Sequelize.DATE,
    lastName: Sequelize.STRING,
    password: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    username: Sequelize.TEXT,
  };

  // const Address = sequelize.define<AddressInstance, IUserAttributes>('Address', attributes, options);
  const User = sequelize.define<UserInstance, IUserAttributes>('User', attributes);

  User.associate = models => {
    User.hasOne(models.Address, {
      foreignKey: 'id',
    });

    // User.belongsToMany(models.Band, {
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    //   through: 'UsersBands',
    // });

    // User.belongsToMany(models.Venue, {
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    //   through: 'UsersVenues',
    // });
  };

  return User;
};
