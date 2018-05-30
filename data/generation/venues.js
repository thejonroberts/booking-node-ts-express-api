'use strict';

// using Faker to generate venues
const faker = require('faker');
const {
	amounts: { numVenues, numAddresses, numGenres },
} = require('./generatorAmounts.json');
const fs = require('fs');

let venues = [];

for (let i = 0; i < numVenues; i++) {
  const name = faker.name.lastName();
  const AddressId = Math.floor(Math.random() * numAddresses) + 1;
  const genreId = Math.floor(Math.random() * numGenres) + 1;

	const createdAt = faker.date.past().toISOString();
	const updatedAt = new Date().toISOString();

	venues.push({
    name,
    AddressId,
    genreId,
		updatedAt,
		createdAt,
	});
}

venues = JSON.stringify(venues);

fs.writeFile('../venues.json', venues, err => {
	if (err) console.log('error!', err);
});
