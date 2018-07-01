// tslint:disable variable-name
'use strict';
const faker = require('faker');
const {
  amounts: { numUsers, numAddresses },
} = require('./generator-amounts.json');
const fs = require('fs');
const bCrypt = require('bcrypt-nodejs');
const hashPassword = password => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
};
let users = [];
for (let i = 0; i < numUsers; i++) {
  const email = faker.internet.email();
  const username = faker.internet.userName();
  const password = hashPassword('1234');
  const first_name = faker.name.firstName();
  const last_name = faker.name.lastName();
  const phone_number = faker.phone.phoneNumberFormat();
  const created_at = faker.date.past().toISOString();
  const recentDate = faker.date.recent().toISOString();
  const last_login_date = faker.date
    .between(created_at, recentDate)
    .toISOString();
  const updated_at = new Date().toISOString();
  const address_id = Math.floor(Math.random() * numAddresses) + 1;
  users.push({
    address_id,
    created_at,
    email,
    first_name,
    last_login_date,
    last_name,
    password,
    phone_number,
    updated_at,
    username,
  });
}
const usersJson = JSON.stringify(users);
fs.writeFile('./db/data/users.json', usersJson, err => {
  if (err) { throw err; }
});
