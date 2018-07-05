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
      allowNull: false,
      field: 'address_id',
      type: Sequelize.INTEGER,
      // references: {
      //   key: 'id',
      //   model: Address,
      // },
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    deletedAt: {
      field: 'deleted_at',
      type: Sequelize.DATE,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    firstName: {
      allowNull: false,
      field: 'first_name',
      type: Sequelize.STRING,
    },
    lastLoginDate: {
      field: 'last_login_date',
      type: Sequelize.DATE,
    },
    lastName: {
      allowNull: false,
      field: 'last_name',
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    // TODO: best type to use here? varchar?
    phoneNumber: {
      field: 'phone_number',
      type: Sequelize.STRING,
    },
    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
    },
    username: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
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
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      otherKey: 'band_id',
      through: 'Members',
    });

    User.belongsToMany(models.Venue, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      otherKey: 'venue_id',
      through: 'Employees',
    });
  };

  return User;
};
