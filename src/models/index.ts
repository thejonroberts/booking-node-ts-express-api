import Sequelize from 'sequelize';
import * as config from '../config/sequelize';

import Address from '../models/address';
import Band from '../models/band';
import Genre from '../models/genre';
import Show from '../models/show';
import User from '../models/user';
import Venue from '../models/venue';

const operatorsAliases: Sequelize.OperatorsAliases = {
  // NOTE: http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-aliases
  $and: Sequelize.Op.and,
  $eq: Sequelize.Op.eq,
  $in: Sequelize.Op.in,
  $like: Sequelize.Op.like,
  $or: Sequelize.Op.or,
};

const define: Sequelize.DefineOptions<any> = {
  paranoid: true,
  timestamps: true,
  underscored: true,
};

const options: Sequelize.Options = {
  // NOTE: http://sequelize.readthedocs.io/en/latest/api/sequelize/index.html
  define,
  logging: false,
  operatorsAliases,
};

// NOTE: http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html
const sequelize: Sequelize.Sequelize =
  new Sequelize(config.url || process.env.DATABASE_URL, options);

// NOTE: https://stackoverflow.com/questions/50377182/sequelize-import-having-an-issue-with-typescript
interface Model {
  [key: string]: any;
}

const models: Model = {
  Address: Address(sequelize),
  Band: Band(sequelize),
  Genre: Genre(sequelize),
  Show: Show(sequelize),
  User: User(sequelize),
  Venue: Venue(sequelize),
};

Object.keys(models).forEach((modelKey: string): void => {
  // NOTE: https://basarat.gitbooks.io/typescript/content/docs/types/typeGuard.html
  // - used in conjunction with Model interface above
  if ('associate' in models[modelKey]) {
    models[modelKey].associate(models);
  }
});

const db = {
  ...models,
  sequelize,
};

module.exports = db;
