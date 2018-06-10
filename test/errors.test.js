const { request, expect } = require('./setup');

describe('GET invalid route', function() {
  it('should return an error', function(done) {
    request
      .get('/garbage')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) {
          expect(err).to.be.a('string');
        }
        done();
      });
  });
});
