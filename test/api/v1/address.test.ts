// tslint:disable no-implicit-dependencies
import * as chai from 'chai';
import request from 'supertest';
import app from '../../../src/server';

const expect = chai.expect;
const accept = 'application/json';

import { AddressAttributes } from '../../../src/models/address';

describe('GET /api/v1/addresses', () => {
  it('responds with json array', done => {
    request(app)
      .get('/api/v1/addresses')
      .set('Accept', accept)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err: Error, res) => {
        if (err) {return done(err); }
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

let createdId: number;

describe('POST /api/v1/addresses', () => {
  it('responds with created address', done => {
    const newAddress: AddressAttributes = {
      city: 'Nashville',
      lineOne: null,
      placeId: null,
      state: 'Tennessee',
      street: '3000 Test St',
      timeZone: 'America/Chicago',
      zipCode: '37216',
    };

    request(app)
      .post('/api/v1/addresses')
      .set('Accept', accept)
      .send(newAddress)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.street).to.equal(newAddress.street);
        expect(res.body.lineOne).to.equal(newAddress.lineOne);
        expect(res.body.city).to.equal(newAddress.city);
        expect(res.body.state).to.equal(newAddress.state);
        expect(res.body.zipCode).to.equal(newAddress.zipCode);
        expect(res.body.timeZone).to.equal(newAddress.timeZone);
        expect(res.body.placeId).to.equal(newAddress.placeId);
        done();
      });
  });
});

const addressUpdate: AddressAttributes = {
  city: 'Memphis',
  lineOne: 'Apt 120',
  placeId: 56,
  state: 'Texas',
  street: '3000 Again St',
  timeZone: 'America/Houston',
  zipCode: '55555',
};

describe('PATCH /api/v1/addresses', () => {
  it('updates the given address id', done => {
    request(app)
      .patch(`/api/v1/addresses/${createdId}`)
      .set('Accept', accept)
      .send(addressUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].street).to.equal(addressUpdate.street);
        expect(res.body[1][0].lineOne).to.equal(addressUpdate.lineOne);
        expect(res.body[1][0].city).to.equal(addressUpdate.city);
        expect(res.body[1][0].state).to.equal(addressUpdate.state);
        expect(res.body[1][0].zipCode).to.equal(addressUpdate.zipCode);
        expect(res.body[1][0].timeZone).to.equal(addressUpdate.timeZone);
        expect(res.body[1][0].placeId).to.equal(addressUpdate.placeId);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', done => {
    request(app)
      .patch(`/api/v1/addresses/${createdId + 10}`)
      .set('Accept', accept)
      .send(addressUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /api/v1/addresses', () => {
  it('deletes the given address id', done => {
    request(app)
      .delete(`/api/v1/addresses/${createdId}`)
      .set('Accept', accept)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].street).to.equal(addressUpdate.street);
        expect(res.body[0].lineOne).to.equal(addressUpdate.lineOne);
        expect(res.body[0].city).to.equal(addressUpdate.city);
        expect(res.body[0].state).to.equal(addressUpdate.state);
        expect(res.body[0].zipCode).to.equal(addressUpdate.zipCode);
        expect(res.body[0].timeZone).to.equal(addressUpdate.timeZone);
        expect(res.body[0].placeId).to.equal(addressUpdate.placeId);
        expect(res.body[0].deleted_at).to.be.a('string');
        done();
      });
  });
});
