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

let newAddress = {
  street: '3000 Test St',
  streetTwo: null,
  city: 'Nashville',
  stateCode: 'TN',
  zipCode: '37216',
  timeZone: 'America/Chicago',
  placeId: null,
};

describe('POST /addresses', function() {
  it('responds with created address', function(done) {
    request
      .post('/addresses')
      .set('Accept', 'application/json')
      .send(newAddress)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body.street).to.equal(newAddress.street);
        expect(res.body.streetTwo).to.equal(newAddress.streetTwo);
        expect(res.body.city).to.equal(newAddress.city);
        expect(res.body.stateCode).to.equal(newAddress.stateCode);
        expect(res.body.zipCode).to.equal(newAddress.zipCode);
        expect(res.body.placeId).to.equal(newAddress.placeId);
        done();
      });
  });
});
