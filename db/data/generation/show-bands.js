'use strict';
const faker = require('faker');
const {
  amounts: { numShows, numBands, maxBandsPerShow },
} = require('./generator-amounts.json');
let fs = require('fs');
let showBands = [];
for (let k = 1; k <= numShows; k++) {
  let ShowId = k;
  let bandsAtShow = Math.floor(Math.random() * maxBandsPerShow) + 1;
  let previousBandIds = [];
  for (let j = 0; j < bandsAtShow; j++) {
    let BandId = Math.floor(Math.random() * numBands) + 1;
    if (previousBandIds.indexOf(BandId) === -1) {
      previousBandIds.push(BandId);
      let createdAt = faker.date.past().toISOString();
      let updatedAt = new Date().toISOString();
      showBands.push({
        ShowId,
        BandId,
        updatedAt,
        createdAt,
      });
    }
  }
}
const showBandsJson = JSON.stringify(showBands);
fs.writeFile('./db/data/show-bands.json', showBandsJson, err => {
  if (err) throw err;
});
