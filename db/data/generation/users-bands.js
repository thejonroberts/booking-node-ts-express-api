// tslint:disable variable-name
'use strict';
const faker = require('faker');
let fs = require('fs');

const {
  amounts: { numUsers, numBands, maxUsersPerBand },
} = require('./generator-amounts.json');

let UsersBands = [];
for (let k = 1; k <= numBands; k++) {

  let band_id = k;
  let usersInBand = Math.floor(Math.random() * maxUsersPerBand) + 1;
  let previousUserIds = [];

  for (let j = 0; j < usersInBand; j++) {
    let user_id = Math.floor(Math.random() * numUsers) + 1;

    if (previousUserIds.indexOf(user_id) === -1) {
      previousUserIds.push(user_id);
      let created_at = faker.date.past().toISOString();
      let updated_at = new Date().toISOString();

      UsersBands.push({
        band_id,
        created_at,
        updated_at,
        user_id,
      });
    }
  }
}
const UsersBandsJson = JSON.stringify(UsersBands);
fs.writeFile('./db/data/users-bands.json', UsersBandsJson, err => {
  if (err) { throw err; }
});
