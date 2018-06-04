require('dotenv').config();
const request = require('supertest');
const app = require('../server');

describe('GET /addresses', () => {
  it('responds with json', () => {
    return request(app)
      .get('/addresses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    // .then(response => {
    //   // it('has length', () => {
    //   assert(response.body.length, 250);
    //   // });
    //   // it('has length of 250', () => {
    //   //   assert.isEqual(response.body.length, 250);
    //   // });
    // });
  });
});
