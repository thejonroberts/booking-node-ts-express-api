const app = require('../server');
const request = require('supertest').agent(app.listen());

describe('GET /addresses', () => {
  it('responds with json', done => {
    request
      .get('/addresses')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        done();
      });
  });
});
