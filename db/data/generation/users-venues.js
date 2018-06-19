'use strict';
const faker = require('faker');
const {
  amounts: { numUsers, numVenues, maxUsersPerVenue },
} = require('./generator-amounts.json');
let fs = require('fs');
let UsersVenues = [];
for (let k = 1; k <= numVenues; k++) {
  let VenueId = k;
  let numUsersForVenue = Math.floor(Math.random() * maxUsersPerVenue) + 1;
  let previousUserIds = [];
  for (let j = 0; j < numUsersForVenue; j++) {
    let UserId = Math.floor(Math.random() * numUsers) + 1;
    if (previousUserIds.indexOf(UserId) === -1) {
      previousUserIds.push(UserId);
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
fs.writeFile('./data/users-venues.json', UsersVenuesJson, err => {
  if (err) throw err;
});
