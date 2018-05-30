'use strict';

const faker = require('faker');

const { amounts: { numEvents, numBands, maxBandsPerEvent } } = require('./generatorAmounts.json');
let fs = require('fs');

let eventBands = [];

for (let k = 1; k <= numEvents; k++) {
  //for each event
  let EventId = k;
  // randomize the number of bands per event between 1 and maxBandsPerEvent
  let bandsAtEvent = Math.floor(Math.random() * maxBandsPerEvent) + 1;
  let previousBandIds = [];
  // for each band "slot"
  for (let j = 0; j < bandsAtEvent; j++) {
    // choose random product out of the total number of products
    let BandId = Math.floor(Math.random() * numBands) + 1;
    // if we haven't already used this random genre:
    if ( previousBandIds.indexOf(BandId) === -1 ) {
      previousBandIds.push(BandId); // store for check

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

fs.writeFile('./data/eventBands.json', eventBandsJson, err => {
  if (err) throw err;
  // eslint-disable-next-line
  console.log('eventBands json saved');
});
