'use strict';

const faker = require('faker');
const {
  amounts: { numBands, numGenres },
} = require('./generator-amounts.json');
const fs = require('fs');

let bands = [];

for (let i = 0; i < numBands; i++) {
  const name = faker.random.word();
  const bandcamp = `https://${name}.bandcamp.com/`;
  const website = `https://www.${name}-band.com`;
  const label = faker.company.companyName();

  const GenreId = Math.floor(Math.random() * numGenres) + 1;

  const createdAt = faker.date.past().toISOString();
  const updatedAt = new Date().toISOString();

  bands.push({
    name,
    bandcamp,
    website,
    label,
    GenreId,
    createdAt,
    updatedAt,
  });
}

const bandsJson = JSON.stringify(bands);

fs.writeFile('./data/bands.json', bandsJson, err => {
  if (err) throw err;
  // eslint-disable-next-line
  console.log('bands json saved');
});
