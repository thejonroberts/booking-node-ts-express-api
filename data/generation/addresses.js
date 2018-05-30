'use strict';

// generate a bunch of addresses with Faker
const faker = require('faker');
const { amounts: { numAddresses } } = require('./generatorAmounts.json');
const fs = require('fs');

let addresses = [];
const placeId = null;
const streetTwo = null;
const timeZone = 'America/Chicago';

for (let i = 0; i < numAddresses; i++) {
  const street = faker.address.streetAddress();
  const city = faker.address.city();
  const stateCode = faker.address.stateAbbr();
  const zipCode = faker.address.zipCode();

  const createdAt = faker.date.past().toISOString();
  const updatedAt = new Date().toISOString();

  addresses.push({
    street,
    streetTwo,
    city,
    stateCode,
    zipCode,
    timeZone,
    placeId,
    createdAt,
    updatedAt,
  });
}

const usersJSONSTRING = JSON.stringify(addresses);

fs.writeFile('../addresses.json', usersJSONSTRING, err => {
  if (err) console.log('error!', err);
});
