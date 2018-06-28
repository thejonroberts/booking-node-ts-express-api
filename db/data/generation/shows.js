'use strict';
const faker = require('faker');
const moment = require('moment');
const {
  amounts: { numShows, numVenues },
} = require('./generator-amounts.json');
const fs = require('fs');
let shows = [];
let pastDate = faker.date.past();
let futureDate = faker.date.future();
for (let i = 0; i < numShows; i++) {
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
  shows.push({
    VenueId,
    startsAt,
    endsAt,
    title,
    description,
    updatedAt,
    createdAt,
  });
}
const showsJson = JSON.stringify(shows);
fs.writeFile('./db/data/shows.json', showsJson, err => {
  if (err) throw err;
});
