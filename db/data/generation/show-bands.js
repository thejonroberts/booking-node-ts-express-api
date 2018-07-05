// tslint:disable variable-name
'use strict';
const faker = require('faker');
let fs = require('fs');

const {
  amounts: { numShows, numBands, maxBandsPerShow },
} = require('./generator-amounts.json');

let showBands = [];
for (let k = 1; k <= numShows; k++) {

  let show_id = k;
  let bandsAtShow = Math.floor(Math.random() * maxBandsPerShow) + 1;
  let previousBandIds = [];

  for (let j = 0; j < bandsAtShow; j++) {

    let band_id = Math.floor(Math.random() * numBands) + 1;
    if (previousBandIds.indexOf(band_id) === -1) {
      previousBandIds.push(band_id);
      let created_at = faker.date.past().toISOString();
      let updated_at = new Date().toISOString();

      showBands.push({
        band_id,
        created_at,
        show_id,
        updated_at,
      });
    }
  }
}
const showBandsJson = JSON.stringify(showBands);
fs.writeFile('./db/data/show-bands.json', showBandsJson, err => {
  if (err) { throw err; }
});
