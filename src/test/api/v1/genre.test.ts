// tslint:disable no-implicit-dependencies
import * as chai from 'chai';
import request from 'supertest';
import app from '../../../server';

const expect = chai.expect;
const accept = 'application/json';

describe('GET /api/v1/genres', () => {
  it('responds with json array', done => {
    request(app)
      .get('/api/v1/genres')
      .set('Accept', accept)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

let createdId: number;

describe('POST /api/v1/genres', () => {
  it('responds with created genre', done => {
    const newGenre = {
      name: 'Jazz Fusion',
    };

    request(app)
      .post('/api/v1/genres')
      .set('Accept', accept)
      .send(newGenre)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
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

describe('PATCH /api/v1/genres', () => {
  it('updates the given genre id', done => {
    request(app)
      .patch(`/api/v1/genres/${createdId}`)
      .set('Accept', accept)
      .send(genreUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].name).to.equal(genreUpdate.name);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', done => {
    request(app)
      .patch(`/api/v1/genres/${createdId + 10}`)
      .set('Accept', accept)
      .send(genreUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /api/v1/genres', () => {
  it('deletes the given genre id', done => {
    request(app)
      .delete(`/api/v1/genres/${createdId}`)
      .set('Accept', accept)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].name).to.equal(genreUpdate.name);
        expect(res.body[0].deletedAt).to.be.a('string');
        done();
      });
  });
});
