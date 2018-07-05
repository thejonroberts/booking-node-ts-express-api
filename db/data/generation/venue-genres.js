// tslint:disable variable-name
'use strict';
const faker = require('faker');
let fs = require('fs');

const {
  amounts: { numGenres, numVenues },
} = require('./generator-amounts.json');

let venueGenres = [];
for (let k = 1; k <= numVenues; k++) {

  let venue_id = k;
  let venueGenreLength = Math.floor(Math.random() * numGenres) + 1;
  let previousGenreIds = [];

  for (let j = 0; j < venueGenreLength; j++) {

    let genre_id = Math.floor(Math.random() * numGenres) + 1;
    if (previousGenreIds.indexOf(genre_id) === -1) {
      previousGenreIds.push(genre_id);
      let created_at = faker.date.past().toISOString();
      let updated_at = new Date().toISOString();

      venueGenres.push({
        created_at,
        genre_id,
        updated_at,
        venue_id,
      });
    }
  }
}
const venueGenresJson = JSON.stringify(venueGenres);
fs.writeFile('./db/data/venue-genres.json', venueGenresJson, err => {
  if (err) { throw err; }
});
