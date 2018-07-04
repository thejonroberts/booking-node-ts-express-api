const fs = require('fs');
const path = require('path');
const sequelizeErd = require('sequelize-erd');
const db = require('../dist/models/index');
/**
 * NOTE: sequelizeERD assumes a different method for model creation.
 * We have to change the way that the models are added to db object, for this
 * to work -- in app.ts, like so:
 *
 * const db = {
 * ...models,  <=> models (remove spread operator)
 * sequelize;
 * }
 *
 * The different syntax also means that all of our model attribures will
 * have type 'undefined'.  TODO: fix that.
 */

const svg = sequelizeErd(db);
fs.writeFileSync(path.join(__dirname, 'erd.svg'), svg);
