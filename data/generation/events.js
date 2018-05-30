'use strict';

// using Faker to generate events
const faker = require('faker');
const {
	amounts: { numEvents, numVenues },
} = require('./generatorAmounts.json');
const fs = require('fs');

let events = [];
let pastDate = faker.date.pastDate();
let futureDate = faker.date.futureDate();
const startTime = '9:00 PM';
const endTime = '12:00 PM';

for (let i = 0; i < numEvents; i++) {
  const venueId = Math.floor(Math.random() * numVenues) + 1;
  const title = faker.commerce.productName();
  const date = faker.date.between(pastDate, futureDate);
  const description = faker.lorem.sentences();

	const createdAt = faker.date.past().toISOString();
	const updatedAt = new Date().toISOString();

	events.push({
    venueId,
    date,
    startTime,
    endTime,
    title,
    description,
		updatedAt,
		createdAt,
	});
}

events = JSON.stringify(events);

fs.writeFile('../events.json', events, err => {
	if (err) console.log('error!', err);
});
