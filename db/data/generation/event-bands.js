'use strict';
const faker = require('faker');
const {
  amounts: { numEvents, numBands, maxBandsPerEvent },
} = require('./generator-amounts.json');
let fs = require('fs');
let eventBands = [];
for (let k = 1; k <= numEvents; k++) {
  let EventId = k;
  let bandsAtEvent = Math.floor(Math.random() * maxBandsPerEvent) + 1;
  let previousBandIds = [];
  for (let j = 0; j < bandsAtEvent; j++) {
    let BandId = Math.floor(Math.random() * numBands) + 1;
    if (previousBandIds.indexOf(BandId) === -1) {
      previousBandIds.push(BandId);
      let createdAt = faker.date.past().toISOString();
      let updatedAt = new Date().toISOString();
      eventBands.push({
        EventId,
        BandId,
        updatedAt,
        createdAt,
      });
    }
  }
}
const eventBandsJson = JSON.stringify(eventBands);
fs.writeFile('./db/data/event-bands.json', eventBandsJson, err => {
  if (err) throw err;
});
