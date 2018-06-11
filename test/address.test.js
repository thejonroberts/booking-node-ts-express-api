const { request, expect } = require('./setup');

describe('GET /addresses', function() {
  it('responds with json array', function(done) {
    request
      .get('/addresses')
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

describe('POST /addresses', function() {
  it('responds with created address', function(done) {
    const newAddress = {
      street: '3000 Test St',
      streetTwo: null,
      city: 'Nashville',
      stateCode: 'TN',
      zipCode: '37216',
      timeZone: 'America/Chicago',
      placeId: null,
    };

    request
      .post('/addresses')
      .set('Accept', 'application/json')
      .send(newAddress)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.street).to.equal(newAddress.street);
        expect(res.body.streetTwo).to.equal(newAddress.streetTwo);
        expect(res.body.city).to.equal(newAddress.city);
        expect(res.body.stateCode).to.equal(newAddress.stateCode);
        expect(res.body.zipCode).to.equal(newAddress.zipCode);
        expect(res.body.timeZone).to.equal(newAddress.timeZone);
        expect(res.body.placeId).to.equal(newAddress.placeId);
        done();
      });
  });
});

const addressUpdate = {
  street: '3000 Again St',
  streetTwo: 'Apt 120',
  city: 'Memphis',
  stateCode: 'TX',
  zipCode: '55555',
  timeZone: 'America/Houston',
  placeId: 56,
};

describe('PATCH /addresses', function() {
  it('updates the given address id', function(done) {
    request
      .patch(`/addresses/${createdId}`)
      .set('Accept', 'application/json')
      .send(addressUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].street).to.equal(addressUpdate.street);
        expect(res.body[1][0].streetTwo).to.equal(addressUpdate.streetTwo);
        expect(res.body[1][0].city).to.equal(addressUpdate.city);
        expect(res.body[1][0].stateCode).to.equal(addressUpdate.stateCode);
        expect(res.body[1][0].zipCode).to.equal(addressUpdate.zipCode);
        expect(res.body[1][0].timeZone).to.equal(addressUpdate.timeZone);
        expect(res.body[1][0].placeId).to.equal(addressUpdate.placeId);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', function(done) {
    request
      .patch(`/addresses/${createdId + 10}`)
      .set('Accept', 'application/json')
      .send(addressUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /addresses', function() {
  it('deletes the given address id', function(done) {
    request
      .delete(`/addresses/${createdId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].street).to.equal(addressUpdate.street);
        expect(res.body[0].streetTwo).to.equal(addressUpdate.streetTwo);
        expect(res.body[0].city).to.equal(addressUpdate.city);
        expect(res.body[0].stateCode).to.equal(addressUpdate.stateCode);
        expect(res.body[0].zipCode).to.equal(addressUpdate.zipCode);
        expect(res.body[0].timeZone).to.equal(addressUpdate.timeZone);
        expect(res.body[0].placeId).to.equal(addressUpdate.placeId);
        expect(res.body[0].deletedAt).to.be.a('string');
        done();
      });
  });
});
