'use strict';
const faker = require('faker');
const {
  amounts: { numGenres },
} = require('./generator-amounts.json');
const fs = require('fs');
const seedGenres = ['Blues', 'Country', 'Electronic', 'Hip-Hop', 'Rock'];
let genres = [];
if (seedGenres.length !== numGenres) {
  throw new Error('ERROR in /data/generation/genres.js: Genre number mismatch');
}
for (let i = 0; i < seedGenres.length; i++) {
  const name = seedGenres[i];
  const createdAt = faker.date.past().toISOString();
  const updatedAt = new Date().toISOString();
  genres.push({
    name,
    updatedAt,
    createdAt,
  });
}
const genresJson = JSON.stringify(genres);
fs.writeFile('./data/genres.json', genresJson, err => {
  if (err) throw err;
});
