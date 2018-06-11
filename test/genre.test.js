const { request, expect } = require('./setup');

describe('GET /genres', function() {
  it('responds with json array', function(done) {
    request
      .get('/genres')
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

describe('POST /genres', function() {
  it('responds with created genre', function(done) {
    const newGenre = {
      name: 'Jazz Fusion',
    };

    request
      .post('/genres')
      .set('Accept', 'application/json')
      .send(newGenre)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.name).to.equal(newGenre.name);
        done();
      });
  });
});

const genreUpdate = {
  name: 'Jazz Scat',
};

describe('PATCH /genres', function() {
  it('updates the given genre id', function(done) {
    request
      .patch(`/genres/${createdId}`)
      .set('Accept', 'application/json')
      .send(genreUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].name).to.equal(genreUpdate.name);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', function(done) {
    request
      .patch(`/genres/${createdId + 10}`)
      .set('Accept', 'application/json')
      .send(genreUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /genres', function() {
  it('deletes the given genre id', function(done) {
    request
      .delete(`/genres/${createdId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].name).to.equal(genreUpdate.name);
        expect(res.body[0].deletedAt).to.be.a('string');
        done();
      });
  });
});
