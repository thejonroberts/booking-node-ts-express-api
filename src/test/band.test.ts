// tslint:disable no-implicit-dependencies
import * as chai from 'chai';
import request from 'supertest';
import app from '../server';

const expect = chai.expect;
const accept = 'application/json';

import { BandAttributes } from '../models/band';

describe('GET /bands', () => {
  it('responds with json array', done => {
    request(app)
      .get('/bands')
      .set('Accept', 'application/json')
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

describe('POST /bands', () => {
  it('responds with created band', done => {
    const newBand: BandAttributes = {
      GenreId: 1,
      bandcamp: 'badtestband.bandcamp.com',
      label: 'in the red',
      name: 'bad test band',
      website: 'www.badtestband.com',
    };

    request(app)
      .post('/bands')
      .set('Accept', accept)
      .send(newBand)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
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

const bandUpdate: BandAttributes = {
  GenreId: 2,
  bandcamp: 'badtestband.bandcamp.com',
  label: 'in the red',
  name: 'bad test band',
  website: 'www.badtestband.com',
};

describe('PATCH /bands', () => {
  it('updates the given band id', done => {
    request(app)
      .patch(`/bands/${createdId}`)
      .set('Accept', accept)
      .send(bandUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].name).to.equal(bandUpdate.name);
        expect(res.body[1][0].bandcamp).to.equal(bandUpdate.bandcamp);
        expect(res.body[1][0].website).to.equal(bandUpdate.website);
        expect(res.body[1][0].label).to.equal(bandUpdate.label);
        expect(res.body[1][0].GenreId).to.equal(bandUpdate.GenreId);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', done => {
    request(app)
      .patch(`/bands/${createdId + 10}`)
      .set('Accept', accept)
      .send(bandUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /bands', () => {
  it('deletes the given band id', done => {
    request(app)
      .delete(`/bands/${createdId}`)
      .set('Accept', accept)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
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
