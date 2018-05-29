'use strict';

// using Faker to generate venues
const faker = require('faker');
const {
	amounts: { numVenues, numUsers }
} = require('./generatorAmounts.json');
let fs = require('fs');

let venues = [];

for (let i = 0; i < numVenues; i++) {
	// let orderDate = faker.date.past().toISOString(); //generates an ISO formate date string
	// let customerUserId = Math.floor(Math.random() * numUsers) + 1;
	// let PaymentTypeId = null;
	// let closedOrderChance = Math.floor(Math.random() * 100);
	// if (closedOrderChance > 50) {
	// 	PaymentTypeId = Math.floor(Math.random() * numPaymentTypes) + 1;
	// }
	let createdAt = faker.date.past().toISOString();
	let updatedAt = new Date().toISOString();

	venues.push({
		// orderDate,
		// PaymentTypeId,
		// customerUserId,
		updatedAt,
		createdAt
	});
}

venues = JSON.stringify(venues);

fs.writeFile('../venues.json', venues, err => {
	if (err) console.log('error!', err);
});
