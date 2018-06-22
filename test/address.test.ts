// tslint:disable no-implicit-dependencies
import * as chai from 'chai';
import request from 'supertest';
import app from '../src/server';

const expect = chai.expect;
const accept = 'application/json';

describe('GET /addresses', () => {
  it('responds with json array', done => {
    request(app)
      .get('/addresses')
      .set('Accept', accept)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {return done(err); }
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

let createdId;

describe('POST /addresses', () => {
  it('responds with created address', done => {
    const newAddress = {
      city: 'Nashville',
      placeId: null,
      stateCode: 'TN',
      street: '3000 Test St',
      streetTwo: null,
      timeZone: 'America/Chicago',
      zipCode: '37216',
    };

    request(app)
      .post('/addresses')
      .set('Accept', accept)
      .send(newAddress)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.street).to.equal(newAddress.street);
        expect(res.body.streetTwo).to.equal(newAddress.streetTwo);
        expect(res.body.city).to.equal(newAddress.city);
        expect(res.body.stateCode).to.equal(newAddress.stateCode);
        expect(res.body.zipCode).to.equal(newAddress.zipCode);
        expect(res.body.timeZone).to.equal(newAddress.timeZone);
        expect(res.body.placeId).to.equal(newAddress.placeId);
        done();
      });
  });
});

const addressUpdate = {
  city: 'Memphis',
  placeId: 56,
  stateCode: 'TX',
  street: '3000 Again St',
  streetTwo: 'Apt 120',
  timeZone: 'America/Houston',
  zipCode: '55555',
};

describe('PATCH /addresses', () => {
  it('updates the given address id', done => {
    request(app)
      .patch(`/addresses/${createdId}`)
      .set('Accept', accept)
      .send(addressUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].street).to.equal(addressUpdate.street);
        expect(res.body[1][0].streetTwo).to.equal(addressUpdate.streetTwo);
        expect(res.body[1][0].city).to.equal(addressUpdate.city);
        expect(res.body[1][0].stateCode).to.equal(addressUpdate.stateCode);
        expect(res.body[1][0].zipCode).to.equal(addressUpdate.zipCode);
        expect(res.body[1][0].timeZone).to.equal(addressUpdate.timeZone);
        expect(res.body[1][0].placeId).to.equal(addressUpdate.placeId);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', done => {
    request(app)
      .patch(`/addresses/${createdId + 10}`)
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

describe('DELETE /addresses', () => {
  it('deletes the given address id', done => {
    request(app)
      .delete(`/addresses/${createdId}`)
      .set('Accept', accept)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].street).to.equal(addressUpdate.street);
        expect(res.body[0].streetTwo).to.equal(addressUpdate.streetTwo);
        expect(res.body[0].city).to.equal(addressUpdate.city);
        expect(res.body[0].stateCode).to.equal(addressUpdate.stateCode);
        expect(res.body[0].zipCode).to.equal(addressUpdate.zipCode);
        expect(res.body[0].timeZone).to.equal(addressUpdate.timeZone);
        expect(res.body[0].placeId).to.equal(addressUpdate.placeId);
        expect(res.body[0].deletedAt).to.be.a('string');
        done();
      });
  });
});
