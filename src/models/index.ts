import * as dotenv from 'dotenv';
dotenv.config();

// generated by sequelize cli init
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// NOTE: const config = require(__dirname + '/../config/config')[env];
import * as configByEnv from '../config/config';
const config = configByEnv[env];

// TODO: proper type here
const sequelize: any = null;
const db = {
  Sequelize,
  sequelize,
};

const Op = Sequelize.Op;
config.operatorsAliases = {
  $adjacent: Op.adjacent,
  $all: Op.all,
  $and: Op.and,
  $any: Op.any,
  $between: Op.between,
  $col: Op.col,
  $contained: Op.contained,
  $contains: Op.contains,
  $eq: Op.eq,
  $gt: Op.gt,
  $gte: Op.gte,
  $iLike: Op.iLike,
  $iRegexp: Op.iRegexp,
  $in: Op.in,
  $is: Op.is,
  $like: Op.like,
  $lt: Op.lt,
  $lte: Op.lte,
  $ne: Op.ne,
  $noExtendLeft: Op.noExtendLeft,
  $noExtendRight: Op.noExtendRight,
  $not: Op.not,
  $notBetween: Op.notBetween,
  $notILike: Op.notILike,
  $notIRegexp: Op.notIRegexp,
  $notIn: Op.notIn,
  $notLike: Op.notLike,
  $notRegexp: Op.notRegexp,
  $or: Op.or,
  $overlap: Op.overlap,
  $regexp: Op.regexp,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $values: Op.values,
};

if (config.use_env_variable) {
  /* eslint-disable no-var, no-redeclare */
  db.sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  db.sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  /* eslint-enable no-var, no-redeclare*/
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = db.sequelize[`import`](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
