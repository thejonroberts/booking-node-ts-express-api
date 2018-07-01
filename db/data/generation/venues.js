// tslint:disable variable-name
'use strict';
const faker = require('faker');
const {
  amounts: { numVenues, numAddresses },
} = require('./generator-amounts.json');
const fs = require('fs');
let venues = [];
for (let i = 0; i < numVenues; i++) {
  const name = faker.name.lastName();
  const description = faker.lorem.sentence();
  const tagline = faker.company.bs();
  const address_id = Math.floor(Math.random() * numAddresses) + 1;
  const created_at = faker.date.past().toISOString();
  const updated_at = new Date().toISOString();
  venues.push({
    address_id,
    created_at,
    description,
    name,
    tagline,
    updated_at,
  });
}
const venuesJson = JSON.stringify(venues);
fs.writeFile('./db/data/venues.json', venuesJson, err => {
  if (err) { throw err; }
});
