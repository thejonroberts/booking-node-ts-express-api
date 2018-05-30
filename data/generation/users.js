'use strict';

// generate a bunch of customers with Faker
const faker = require('faker');
const { amounts: { numUsers, numAddresses } } = require('./generatorAmounts.json');
const fs = require('fs');
const bCrypt = require('bcrypt-nodejs');

const hasher = password => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
};

let users = [];

for (let i = 0; i < numUsers; i++) {
  const email = faker.internet.email();
  const username = faker.internet.userName();
  const password = hasher('1234');
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const phoneNumber = faker.phone.phoneNumberFormat();

  const createdAt = faker.date.past().toISOString();
  const recent_date = faker.date.recent().toISOString();
  const lastLoginDate = faker.date.between(createdAt, recent_date).toISOString();
  const updatedAt = new Date().toISOString();

  const addressId = Math.floor(Math.random() * numAddresses) + 1;

  users.push({
    email,
    username,
    password,
    firstName,
    lastName,
    phoneNumber,
    addressId,
    createdAt,
    lastLoginDate,
    updatedAt,
  });
}

const usersJsonString = JSON.stringify(users);

fs.writeFile('../users.json', usersJsonString, err => {
  if (err) console.log('error!', err);
});
