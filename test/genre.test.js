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
