'use strict';

const faker = require('faker');

const {
  amounts: { numGenres, numVenues },
} = require('./generatorAmounts.json');
let fs = require('fs');

let venueGenres = [];

for (let k = 1; k <= numVenues; k++) {
  //for each venue
  let VenueId = k;
  // randomize the number of genres per venue up to total number
  let venueGenreLength = Math.floor(Math.random() * numGenres) + 1;
  let previousGenreIds = [];
  // for each genre "slot"
  for (let j = 0; j < venueGenreLength; j++) {
    // choose random product out of the total number of products
    let GenreId = Math.floor(Math.random() * numGenres) + 1;
    // if we haven't already used this random genre:
    if (previousGenreIds.indexOf(GenreId) === -1) {
      previousGenreIds.push(GenreId); // store for check

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

fs.writeFile('./data/venueGenres.json', venueGenresJson, err => {
  if (err) throw err;
  // eslint-disable-next-line
  console.log('venueGenres json saved');
});
