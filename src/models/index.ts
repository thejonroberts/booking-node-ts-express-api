import * as dotenv from 'dotenv';
dotenv.config();

import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
import * as configByEnv from '../config/config';
const config = configByEnv[env];

import AddressFactory from '../models/address';
import BandFactory from '../models/band';
import GenreFactory from '../models/genre';
import ShowFactory from '../models/show';
import UserFactory from '../models/user';
import VenueFactory from '../models/venue';

const operatorsAliases: Sequelize.OperatorsAliases = {
  // NOTE: http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-aliases
  $and: Sequelize.Op.and,
  $eq: Sequelize.Op.eq,
  $in: Sequelize.Op.in,
  $like: Sequelize.Op.like,
  $or: Sequelize.Op.or,
};

const define: Sequelize.DefineOptions<any> = {
  // TODO: NOTE: link to list here
  paranoid: true,
  timestamps: true,
};

// NOTE: http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html
const sequelize: Sequelize.Sequelize =
  new Sequelize(config.url || process.env.DATABASE_CONNECTION_URI, { operatorsAliases, define });

const db = {
  Address: AddressFactory(sequelize),
  Band: BandFactory(sequelize),
  Genre: GenreFactory(sequelize),
  Sequelize,
  Show: ShowFactory(sequelize),
  User: UserFactory(sequelize),
  Venue: VenueFactory(sequelize),
  sequelize,
};

Object.keys(db).forEach((dbKey): void => {
  // TODO: how to type to account for non-models
  if (db[dbKey].associate) {
    db[dbKey].associate(db);
  }
});

module.exports = db;
