'use strict';
const faker = require('faker');
const {
  amounts: { numGenres, numVenues },
} = require('./generator-amounts.json');
let fs = require('fs');
let venueGenres = [];
for (let k = 1; k <= numVenues; k++) {
  let VenueId = k;
  let venueGenreLength = Math.floor(Math.random() * numGenres) + 1;
  let previousGenreIds = [];
  for (let j = 0; j < venueGenreLength; j++) {
    let GenreId = Math.floor(Math.random() * numGenres) + 1;
    if (previousGenreIds.indexOf(GenreId) === -1) {
      previousGenreIds.push(GenreId);
      let createdAt = faker.date.past().toISOString();
      let updatedAt = new Date().toISOString();
      venueGenres.push({
        VenueId,
        GenreId,
        updatedAt,
        createdAt,
      });
    }
  }
}
const venueGenresJson = JSON.stringify(venueGenres);
fs.writeFile('./db/data/venue-genres.json', venueGenresJson, err => {
  if (err) throw err;
});
