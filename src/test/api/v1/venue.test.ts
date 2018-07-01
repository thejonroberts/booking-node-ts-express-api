// tslint:disable no-implicit-dependencies
import * as chai from 'chai';
import request from 'supertest';
import app from '../../../server';

const expect = chai.expect;
const accept = 'application/json';

import { VenueAttributes } from '../../../models/venue';

describe('GET /api/v1/venues', () => {
  it('responds with json array', done => {
    request(app)
      .get('/api/v1/venues')
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

describe('POST /api/v1/venues', () => {
  it('responds with created venue', done => {
    const newVenue: VenueAttributes = {
      addressId: 1,
      name: 'Mutiny',
    };

    request(app)
      .post('/api/v1/venues')
      .set('Accept', accept)
      .send(newVenue)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.name).to.equal(newVenue.name);
        done();
      });
  });
});

const venueUpdate: VenueAttributes = {
  addressId: 1,
  name: 'New Mutiny',
};

describe('PATCH /api/v1/venues', () => {
  it('updates the given venue id', done => {
    request(app)
      .patch(`/api/v1/venues/${createdId}`)
      .set('Accept', accept)
      .send(venueUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].name).to.equal(venueUpdate.name);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', done => {
    request(app)
      .patch(`/api/v1/venues/${createdId + 10}`)
      .set('Accept', accept)
      .send(venueUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /api/v1/venues', () => {
  it('deletes the given venue id', done => {
    request(app)
      .delete(`/api/v1/venues/${createdId}`)
      .set('Accept', accept)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].name).to.equal(venueUpdate.name);
        expect(res.body[0].deletedAt).to.be.a('string');
        done();
      });
  });
});
