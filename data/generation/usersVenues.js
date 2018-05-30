'use strict';

const faker = require('faker');

const { amounts: { numUsers, numVenues, maxUsersPerVenue } } = require('./generatorAmounts.json');
let fs = require('fs');

let UsersVenues = [];

for (let k = 1; k <= numVenues; k++) {
  // for each venue
  let VenueId = k;
  // randomize the number of users per venue between 1 and maxUsersPerVenue
  let numUsersForVenue = Math.floor(Math.random() * maxUsersPerVenue) + 1;
  let previousUserIds = [];
  // for each band "slot"
  for (let j = 0; j < numUsersForVenue; j++) {
    // choose random product out of the total number of products
    let UserId = Math.floor(Math.random() * numUsers) + 1;
    // if we haven't already used this random genre:
    if ( previousUserIds.indexOf(UserId) === -1 ) {
      previousUserIds.push(UserId); // store for check

      let createdAt = faker.date.past().toISOString();
      let updatedAt = new Date().toISOString();

      UsersVenues.push({
        VenueId,
        UserId,
        updatedAt,
        createdAt,
      });
    }
  }
}

const UsersVenuesJson = JSON.stringify(UsersVenues);

fs.writeFile('./data/usersVenues.json', UsersVenuesJson, err => {
  if (err) throw err;
  // eslint-disable-next-line
  console.log('usersVenues json saved');
});
