// tslint:disable no-implicit-dependencies
import * as chai from 'chai';
import request from 'supertest';
import app from '../../../server';

const expect = chai.expect;
const accept = 'application/json';

import { BandAttributes } from '../../../models/band';

describe('GET /api/v1/bands', () => {
  it('responds with json array', done => {
    request(app)
      .get('/api/v1/bands')
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

describe('POST /api/v1/bands', () => {
  it('responds with created band', done => {
    const newBand: BandAttributes = {
      bandcamp: 'badtestband.bandcamp.com',
      description: 'No, like, for real. Not good bad, just bad',
      genreId: 1,
      label: 'in the red',
      name: 'bad test band',
      tagline: 'We\'re really bad',
      website: 'www.badtestband.com',
    };

    request(app)
      .post('/api/v1/bands')
      .set('Accept', accept)
      .send(newBand)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.name).to.equal(newBand.name);
        expect(res.body.tagline).to.equal(newBand.tagline);
        expect(res.body.description).to.equal(newBand.description);
        expect(res.body.bandcamp).to.equal(newBand.bandcamp);
        expect(res.body.website).to.equal(newBand.website);
        expect(res.body.label).to.equal(newBand.label);
        expect(res.body.genreId).to.equal(newBand.genreId);
        done();
      });
  });
});

const bandUpdate: BandAttributes = {
  bandcamp: 'badtestband.bandcamp.com',
  description: 'No, like, for real. Not good bad, just bad. Just don\'t',
  genreId: 2,
  label: 'in the red',
  name: 'bad test band',
  tagline: 'This is not okay.',
  website: 'www.badtestband.com',
};

describe('PATCH /api/v1/bands', () => {
  it('updates the given band id', done => {
    request(app)
      .patch(`/api/v1/bands/${createdId}`)
      .set('Accept', accept)
      .send(bandUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].name).to.equal(bandUpdate.name);
        expect(res.body[1][0].description).to.equal(bandUpdate.description);
        expect(res.body[1][0].tagline).to.equal(bandUpdate.tagline);
        expect(res.body[1][0].bandcamp).to.equal(bandUpdate.bandcamp);
        expect(res.body[1][0].website).to.equal(bandUpdate.website);
        expect(res.body[1][0].label).to.equal(bandUpdate.label);
        expect(res.body[1][0].genreId).to.equal(bandUpdate.genreId);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', done => {
    request(app)
      .patch(`/api/v1/bands/${createdId + 10}`)
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

describe('DELETE /api/v1/bands', () => {
  it('deletes the given band id', done => {
    request(app)
      .delete(`/api/v1/bands/${createdId}`)
      .set('Accept', accept)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].name).to.equal(bandUpdate.name);
        expect(res.body[0].bandcamp).to.equal(bandUpdate.bandcamp);
        expect(res.body[0].website).to.equal(bandUpdate.website);
        expect(res.body[0].label).to.equal(bandUpdate.label);
        expect(res.body[0].genreId).to.equal(bandUpdate.genreId);
        expect(res.body[0].deleted_at).to.be.a('string');
        done();
      });
  });
});
