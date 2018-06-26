import * as dotenv from 'dotenv';
dotenv.config();

import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
import * as configByEnv from '../config/config';
const config = configByEnv[env];

import AddressFactory from '../models/address';
import BandFactory from '../models/band';
import ShowFactory from '../models/show';
import GenreFactory from '../models/genre';
import UserFactory from '../models/user';
import VenueFactory from '../models/venue';

const operatorsAliases = {
  $and: Sequelize.Op.and,
  $eq: Sequelize.Op.eq,
  $gt: Sequelize.Op.gt,
  $gte: Sequelize.Op.gte,
  $iLike: Sequelize.Op.iLike,
  $in: Sequelize.Op.in,
  $is: Sequelize.Op.is,
  $like: Sequelize.Op.like,
  $lt: Sequelize.Op.lt,
  $lte: Sequelize.Op.lte,
  $ne: Sequelize.Op.ne,
  $or: Sequelize.Op.or,
};

const define = {
  paranoid: true,
  timestamps: true,
};

const sequelize = new Sequelize(config.url || process.env.DATABASE_CONNECTION_URI, { operatorsAliases, define });

const db = {
  Address: AddressFactory(sequelize),
  Band: BandFactory(sequelize),
  Show: ShowFactory(sequelize),
  Genre: GenreFactory(sequelize),
  Sequelize,
  User: UserFactory(sequelize),
  Venue: VenueFactory(sequelize),
  sequelize,
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
