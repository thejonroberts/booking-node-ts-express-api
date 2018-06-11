const { request, expect } = require('./setup');

describe('GET /venues', function() {
  it('responds with json array', function(done) {
    request
      .get('/venues')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

let createdId;

describe('POST /venues', function() {
  it('responds with created venue', function(done) {
    const newVenue = {
      name: 'Mutiny',
      AddressId: 1,
    };

    request
      .post('/venues')
      .set('Accept', 'application/json')
      .send(newVenue)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.name).to.equal(newVenue.name);
        done();
      });
  });
});

const venueUpdate = {
  name: 'New Mutiny',
  AddressId: 1,
};

describe('PATCH /venues', function() {
  it('updates the given venue id', function(done) {
    request
      .patch(`/venues/${createdId}`)
      .set('Accept', 'application/json')
      .send(venueUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].name).to.equal(venueUpdate.name);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', function(done) {
    request
      .patch(`/venues/${createdId + 10}`)
      .set('Accept', 'application/json')
      .send(venueUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /venues', function() {
  it('deletes the given venue id', function(done) {
    request
      .delete(`/venues/${createdId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].name).to.equal(venueUpdate.name);
        expect(res.body[0].deletedAt).to.be.a('string');
        done();
      });
  });
});
