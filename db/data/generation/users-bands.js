'use strict';
const faker = require('faker');
let fs = require('fs');
const {
  amounts: { numUsers, numBands, maxUsersPerBand },
} = require('./generator-amounts.json');
let UsersBands = [];
for (let k = 1; k <= numBands; k++) {
  let BandId = k;
  let usersInBand = Math.floor(Math.random() * maxUsersPerBand) + 1;
  let previousUserIds = [];
  for (let j = 0; j < usersInBand; j++) {
    let UserId = Math.floor(Math.random() * numUsers) + 1;
    if (previousUserIds.indexOf(UserId) === -1) {
      previousUserIds.push(UserId);
      let createdAt = faker.date.past().toISOString();
      let updatedAt = new Date().toISOString();
      UsersBands.push({
        UserId,
        BandId,
        updatedAt,
        createdAt,
      });
    }
  }
}
const UsersBandsJson = JSON.stringify(UsersBands);
fs.writeFile('./data/users-bands.json', UsersBandsJson, err => {
  if (err) throw err;
});
