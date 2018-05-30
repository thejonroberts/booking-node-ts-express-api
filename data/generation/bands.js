'use strict';

// generate a bunch of addresses with Faker
const faker = require('faker');
const { amounts: { numBands, numGenres } } = require('./generatorAmounts.json');
const fs = require('fs');

let bands = [];

for (let i = 0; i < numBands; i++) {

  const name = faker.random.word();
  const bandcamp = `https://${name}.bandcamp.com/`;
  const website = `https://www.${name}-band.com`;
  const label = faker.company.companyName();

  const genreId = Math.floor(Math.random() * numGenres) + 1;

  const createdAt = faker.date.past().toISOString();
  const updatedAt = new Date().toISOString();

  bands.push({
    name,
    bandcamp,
    website,
    label,
    genreId,
    createdAt,
    updatedAt,
  });
}

const usersJSONSTRING = JSON.stringify(bands);

fs.writeFile('../bands.json', usersJSONSTRING, err => {
  if (err) console.log('error!', err);
});
