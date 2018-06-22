'use strict';
const faker = require('faker');
const moment = require('moment');
const {
  amounts: { numEvents, numVenues },
} = require('./generator-amounts.json');
const fs = require('fs');
let events = [];
let pastDate = faker.date.past();
let futureDate = faker.date.future();
for (let i = 0; i < numEvents; i++) {
  const VenueId = Math.floor(Math.random() * numVenues) + 1;
  const title = faker.commerce.productName();
  const date = faker.date.between(pastDate, futureDate);
  const startsAt = moment(date).toISOString();
  const endsAt = moment(startsAt)
    .add(3, 'hours')
    .toISOString();
  const description = faker.lorem.sentence();
  const createdAt = faker.date.past().toISOString();
  const updatedAt = new Date().toISOString();
  events.push({
    VenueId,
    startsAt,
    endsAt,
    title,
    description,
    updatedAt,
    createdAt,
  });
}
const eventsJson = JSON.stringify(events);
fs.writeFile('./db/data/events.json', eventsJson, err => {
  if (err) throw err;
});
