// tslint:disable variable-name
'use strict';
const faker = require('faker');
let fs = require('fs');

const {
  amounts: { numUsers, numVenues, maxUsersPerVenue },
} = require('./generator-amounts.json');

let UsersVenues = [];
for (let k = 1; k <= numVenues; k++) {

  let venue_id = k;
  let numUsersForVenue = Math.floor(Math.random() * maxUsersPerVenue) + 1;
  let previousUserIds = [];

  for (let j = 0; j < numUsersForVenue; j++) {
    let user_id = Math.floor(Math.random() * numUsers) + 1;

    if (previousUserIds.indexOf(user_id) === -1) {
      previousUserIds.push(user_id);
      let created_at = faker.date.past().toISOString();
      let updated_at = new Date().toISOString();

      UsersVenues.push({
        created_at,
        updated_at,
        user_id,
        venue_id,
      });
    }
  }
}
const UsersVenuesJson = JSON.stringify(UsersVenues);
fs.writeFile('./db/data/users-venues.json', UsersVenuesJson, err => {
  if (err) { throw err; }
});
