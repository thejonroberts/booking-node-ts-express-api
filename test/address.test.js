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
