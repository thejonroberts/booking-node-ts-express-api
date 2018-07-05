// tslint:disable variable-name
'use strict';
const faker = require('faker');
const moment = require('moment');
const fs = require('fs');

const {
  amounts: { numShows, numVenues },
} = require('./generator-amounts.json');

let shows = [];
let pastDate = faker.date.past();
let futureDate = faker.date.future();

for (let i = 0; i < numShows; i++) {
  const venue_id = Math.floor(Math.random() * numVenues) + 1;
  const title = faker.commerce.productName();
  const date = faker.date.between(pastDate, futureDate);
  const starts_at = moment(date).toISOString();
  const ends_at = moment(starts_at).add(3, 'hours').toISOString();
  const description = faker.lorem.sentence();
  const created_at = faker.date.past().toISOString();
  const updated_at = new Date().toISOString();

  shows.push({
    created_at,
    description,
    ends_at,
    starts_at,
    title,
    updated_at,
    venue_id,
  });
}

const showsJson = JSON.stringify(shows);
fs.writeFile('./db/data/shows.json', showsJson, err => {
  if (err) { throw err; }
});
