import * as dotenv from 'dotenv';
dotenv.config();

import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
import * as configByEnv from '../config/config';
const config = configByEnv[env];

import AddressFactory from '../models/address';
import BandFactory from '../models/band';
// import Event from '../models/event';
// import Genre from '../models/genre';
import UserFactory from '../models/user';
// import Venue from '../models/venue';

const Op = Sequelize.Op;
const operatorsAliases = {
  // $adjacent: Op.adjacent,
  // $all: Op.all,
  $and: Op.and,
  // $any: Op.any,
  // $between: Op.between,
  // $col: Op.col,
  // $contained: Op.contained,
  // $contains: Op.contains,
  $eq: Op.eq,
  $gt: Op.gt,
  $gte: Op.gte,
  $iLike: Op.iLike,
  // $iRegexp: Op.iRegexp,
  $in: Op.in,
  $is: Op.is,
  $like: Op.like,
  $lt: Op.lt,
  $lte: Op.lte,
  $ne: Op.ne,
  // $noExtendLeft: Op.noExtendLeft,
  // $noExtendRight: Op.noExtendRight,
  // $not: Op.not,
  // $notBetween: Op.notBetween,
  // $notILike: Op.notILike,
  // $notIRegexp: Op.notIRegexp,
  // $notIn: Op.notIn,
  // $notLike: Op.notLike,
  // $notRegexp: Op.notRegexp,
  $or: Op.or,
  // $overlap: Op.overlap,
  // $regexp: Op.regexp,
  // $strictLeft: Op.strictLeft,
  // $strictRight: Op.strictRight,
  // $values: Op.values,
};

const define = {
  paranoid: true,
  timestamps: true,
};

const sequelize = new Sequelize(config.url || process.env.DATABASE_CONNECTION_URI, { operatorsAliases, define });

const db = {
  Address: AddressFactory(sequelize),
  // Band: BandFactory(sequelize),
  Sequelize,
  User: UserFactory(sequelize),
  sequelize,
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
