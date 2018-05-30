'use strict';

const faker = require('faker');
let fs = require('fs');

const {
  amounts: {
    numUsers,
    numBands,
    maxUsersPerBand,
  },
} = require('./generatorAmounts.json');

let UsersBands = [];

for (let k = 1; k <= numBands; k++) {
  // for each band
  let BandId = k;
  // randomize the number of users per band between 1 and maxUsersPerBand
  let usersInBand = Math.floor(Math.random() * maxUsersPerBand) + 1;
  let previousUserIds = [];
  // for each user / band member "slot"
  for (let j = 0; j < usersInBand; j++) {
    // choose random product out of the total number of products
    let UserId = Math.floor(Math.random() * numUsers) + 1;
    // if we haven't already used this random genre:
    if ( previousUserIds.indexOf(UserId) === -1 ) {
      previousUserIds.push(UserId); // store for check

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

fs.writeFile('./data/usersBands.json', UsersBandsJson, err => {
  if (err) throw err;
  // eslint-disable-next-line
  console.log('usersBands json saved');
});
