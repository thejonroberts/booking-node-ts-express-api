require('dotenv').config();
const request = require('supertest');
const app = require('../server');

describe('GET /addresses', () => {
  it('responds with json', () => {
    request(app)
      .get('/addresses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end();
  });
});
