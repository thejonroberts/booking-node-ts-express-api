const { request, expect } = require('./setup');

describe('GET /bands', function() {
  it('responds with json array', function(done) {
    request
      .get('/bands')
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

describe('POST /bands', function() {
  it('responds with created band', function(done) {
    const newBand = {
      name: 'bad test band',
      bandcamp: 'badtestband.bandcamp.com',
      website: 'www.badtestband.com',
      label: 'in the red',
      GenreId: 1,
    };

    request
      .post('/bands')
      .set('Accept', 'application/json')
      .send(newBand)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.name).to.equal(newBand.name);
        expect(res.body.bandcamp).to.equal(newBand.bandcamp);
        expect(res.body.website).to.equal(newBand.website);
        expect(res.body.label).to.equal(newBand.label);
        expect(res.body.GenreId).to.equal(newBand.GenreId);
        done();
      });
  });
});

const bandUpdate = {
  name: 'bad test band',
  bandcamp: 'badtestband.bandcamp.com',
  website: 'www.badtestband.com',
  label: 'in the red',
  GenreId: 2,
};

describe('PATCH /bands', function() {
  it('updates the given band id', function(done) {
    request
      .patch(`/bands/${createdId}`)
      .set('Accept', 'application/json')
      .send(bandUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].name).to.equal(bandUpdate.name);
        expect(res.body[1][0].bandcamp).to.equal(bandUpdate.bandcamp);
        expect(res.body[1][0].website).to.equal(bandUpdate.website);
        expect(res.body[1][0].label).to.equal(bandUpdate.label);
        expect(res.body[1][0].GenreId).to.equal(bandUpdate.GenreId);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', function(done) {
    request
      .patch(`/bands/${createdId + 10}`)
      .set('Accept', 'application/json')
      .send(bandUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /bands', function() {
  it('deletes the given band id', function(done) {
    request
      .delete(`/bands/${createdId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].name).to.equal(bandUpdate.name);
        expect(res.body[0].bandcamp).to.equal(bandUpdate.bandcamp);
        expect(res.body[0].website).to.equal(bandUpdate.website);
        expect(res.body[0].label).to.equal(bandUpdate.label);
        expect(res.body[0].GenreId).to.equal(bandUpdate.GenreId);
        expect(res.body[0].deletedAt).to.be.a('string');
        done();
      });
  });
});
