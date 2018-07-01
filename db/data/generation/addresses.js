// tslint:disable variable-name
'use strict';
const faker = require('faker');
const fs = require('fs');

const {
  amounts: { numAddresses },
} = require('./generator-amounts.json');

let addresses = [];
const place_id = null;
const line_one = null;
const time_zone = 'America/Chicago';

for (let i = 0; i < numAddresses; i++) {

  const street = faker.address.streetAddress();
  const city = faker.address.city();
  const state = faker.address.state();
  const country = faker.address.country();
  const zip_code = faker.address.zipCode();
  const created_at = faker.date.past().toISOString();
  const updated_at = new Date().toISOString();

  addresses.push({
    city,
    country,
    created_at,
    line_one,
    place_id,
    state,
    street,
    time_zone,
    updated_at,
    zip_code,
  });
}

const addressesJson = JSON.stringify(addresses);
fs.writeFile('./db/data/addresses.json', addressesJson, err => {
  if (err) { throw err; }
});
