import * as Sequelize from 'sequelize';

export interface UserAttributes {
  addressId?: number;
  email?: string;
  firstName?: string;
  lastLoginDate?: string;
  lastName?: string;
  password?: string;
  phoneNumber?: string;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

export default (sequelize: Sequelize.Sequelize) => {

  const attributes: SequelizeAttributes<UserAttributes> = {
    addressId: {
      field: 'address_id',
      type: Sequelize.INTEGER,
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      type: Sequelize.DATE,
    },
    email: Sequelize.STRING,
    firstName: {
      field: 'first_name',
      type: Sequelize.STRING,
    },
    lastLoginDate: {
      field: 'last_login_date',
      type: Sequelize.DATE,
    },
    lastName: {
      field: 'last_name',
      type: Sequelize.STRING,
    },
    password: Sequelize.STRING,
    // TODO: best type to use here? varchar?
    phoneNumber: {
      field: 'phone_number',
      type: Sequelize.STRING,
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
    username: Sequelize.TEXT,
  };

  const options = {
    name: {
      plural: 'users',
      singular: 'user',
    },
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes, options);

  User.associate = models => {
    User.hasOne(models.Address, {
      foreignKey: 'id',
    });

    User.belongsToMany(models.Band, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      otherKey: 'band_id',
      foreignKey: 'user_id',
      through: 'Members',
    });

    User.belongsToMany(models.Venue, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      otherKey: 'venue_id',
      foreignKey: 'user_id',
      through: 'Employees',
    });
  };

  return User;
};
