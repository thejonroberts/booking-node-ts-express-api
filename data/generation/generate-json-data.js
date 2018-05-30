'use strict';
// table                    // dependency
require('./addresses');
require('./genres');
require('./users');         // addresses
require('./venues');        // addresses
require('./events');        // venues
require('./bands');         // genres
// join tables
require('./venueGenres');   // venues, genres
require('./usersBands');    // users, bands
require('./usersVenues');   // users, venues
require('./eventBands');    // events, bands
