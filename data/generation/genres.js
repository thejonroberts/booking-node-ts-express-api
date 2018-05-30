'use strict';

const faker = require('faker');
const {
	amounts: { numGenres },
} = require('./generatorAmounts.json');
const fs = require('fs');

let genres = [
  'Blues',
  'Country',
  'Electronic',
  'Folk',
  'Hip-Hop',
  'Metal',
  'Pop',
  'Punk',
  'R&B',
  'Rock',
];

// Warn if number of genres in generatorAmounts.json is different.
// - will cause problems with join tables.
if (genres.length !== numGenres) {
  //eslint-disable-next-line
  console.error('Warning: Genre number mismatch in data generation, joins will be wrong');
}

for (let i = 0; i < genres.length; i++) {
  const name = genres[i];

	const createdAt = faker.date.past().toISOString();
	const updatedAt = new Date().toISOString();

	genres.push({
    name,
		updatedAt,
		createdAt,
	});
}

genres = JSON.stringify(genres);

fs.writeFile('../genres.json', genres, err => {
	if (err) console.log('error!', err);
});
