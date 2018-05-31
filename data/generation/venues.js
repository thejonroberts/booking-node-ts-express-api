'use strict';

// using Faker to generate venues
const faker = require('faker');
const {
  amounts: { numVenues, numAddresses },
} = require('./generatorAmounts.json');
const fs = require('fs');

let venues = [];

for (let i = 0; i < numVenues; i++) {
  const name = faker.name.lastName();
  const AddressId = Math.floor(Math.random() * numAddresses) + 1;

  const createdAt = faker.date.past().toISOString();
  const updatedAt = new Date().toISOString();

  venues.push({
    name,
    AddressId,
    updatedAt,
    createdAt,
  });
}

const venuesJson = JSON.stringify(venues);

fs.writeFile('./data/venues.json', venuesJson, err => {
  if (err) throw err;
  // eslint-disable-next-line
  console.log('venues json saved');
});
