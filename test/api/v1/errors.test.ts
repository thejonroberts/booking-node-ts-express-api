// tslint:disable no-implicit-dependencies
import * as chai from 'chai';
import request from 'supertest';
import app from '../../../src/server';

const expect = chai.expect;
const accept = 'application/json';

describe('GET invalid route', () => {
  it('should return an error', done => {
    request(app)
      .get('/api/v1/garbage')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) {
          expect(err).to.be.an('object');
        }
        done();
      });
  });
});
