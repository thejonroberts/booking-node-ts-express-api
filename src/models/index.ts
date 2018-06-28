import Sequelize from 'sequelize';
import * as config from '../config/config';

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
  paranoid: true,
  timestamps: true,
};

const options: Sequelize.Options = {
  // http://sequelize.readthedocs.io/en/latest/api/sequelize/index.html
  define,
  logging: false,
  operatorsAliases,
};

// NOTE: http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html
const sequelize: Sequelize.Sequelize =
  new Sequelize(config.url || process.env.DATABASE_CONNECTION_URI, options);

// NOTE: https://stackoverflow.com/questions/50377182/sequelize-import-having-an-issue-with-typescript
interface DbMember {
  [key: string]: any;
}

const db: DbMember = {
  Address: AddressFactory(sequelize),
  Band: BandFactory(sequelize),
  Genre: GenreFactory(sequelize),
  Sequelize,
  Show: ShowFactory(sequelize),
  User: UserFactory(sequelize),
  Venue: VenueFactory(sequelize),
  sequelize,
};

Object.keys(db).forEach((dbKey: string): void => {
  // NOTE:  https://basarat.gitbooks.io/typescript/content/docs/types/typeGuard.html
  // - used in conjunction with DbMember interface above
  if ('associate' in db[dbKey]) {
    db[dbKey].associate(db);
  }
});

module.exports = db;
