'use strict';

const faker = require('faker');
const {
	amounts: { numGenres },
} = require('./generatorAmounts.json');
const fs = require('fs');

const seedGenres = [
  'Blues',
  'Country',
  'Electronic',
  'Hip-Hop',
  'Rock',
];

let genres = [];
// Warn if number of genres in generatorAmounts.json is different.
// - will cause problems with join tables.
if (seedGenres.length !== numGenres) {
  //eslint-disable-next-line
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
  // eslint-disable-next-line
  console.log('genres json saved');
});
