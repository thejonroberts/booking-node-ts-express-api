// tslint:disable variable-name
'use strict';
const faker = require('faker');
const fs = require('fs');

const {
  amounts: { numGenres },
} = require('./generator-amounts.json');

const seedGenres = ['Blues', 'Country', 'Electronic', 'Hip-Hop', 'Rock'];
let genres = [];

if (seedGenres.length !== numGenres) {
  throw new Error('ERROR in /data/generation/genres.js: Genre number mismatch');
}

for (let i = 0; i < seedGenres.length; i++) {
  const name = seedGenres[i];
  const created_at = faker.date.past().toISOString();
  const updated_at = new Date().toISOString();

  genres.push({
    created_at,
    name,
    updated_at,
  });
}
const genresJson = JSON.stringify(genres);
fs.writeFile('./db/data/genres.json', genresJson, err => {
  if (err) { throw err; }
});
