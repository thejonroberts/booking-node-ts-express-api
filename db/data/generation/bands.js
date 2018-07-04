// tslint:disable variable-name
'use strict';
const faker = require('faker');
const fs = require('fs');

const {
  amounts: { numAddresses, numBands, numGenres },
} = require('./generator-amounts.json');

let bands = [];
for (let i = 0; i < numBands; i++) {

  const name = faker.random.word();
  const bandcamp = (`https://${name}.bandcamp.com/`).toLowerCase();
  const website = (`https://www.${name}-band.com`).toLowerCase();
  const tagline = faker.company.bs();
  const description = faker.lorem.sentence();
  const label = faker.company.companyName();
  const genre_id = Math.floor(Math.random() * numGenres) + 1;
  const address_id = Math.floor(Math.random() * numAddresses) + 1;
  const created_at = faker.date.past().toISOString();
  const updated_at = new Date().toISOString();

  bands.push({
    address_id,
    bandcamp,
    created_at,
    description,
    genre_id,
    label,
    name,
    tagline,
    updated_at,
    website,
  });
}
const bandsJson = JSON.stringify(bands);
fs.writeFile('./db/data/bands.json', bandsJson, err => {
  if (err) {throw err; }
});
