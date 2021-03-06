// tslint:disable no-implicit-dependencies
// tslint:disable no-hardcoded-credentials
import * as chai from 'chai';
import request from 'supertest';
import app from '../../../src/server';

const expect = chai.expect;
const accept = 'application/json';

import { UserAttributes } from '../../../src/models/user';

describe('GET /api/v1/users', () => {
  it('responds with json array', done => {
    request(app)
      .get('/api/v1/users')
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

describe('POST /api/v1/users', () => {
  it('responds with created user', done => {
    const newUser: UserAttributes = {
      addressId: 1,
      email: 'josh@josh.com',
      firstName: 'Josh',
      lastLoginDate: new Date('December 17, 2016 02:00:00').toISOString(),
      lastName: 'Test',
      password: 'insecure',
      phoneNumber: '5555555555',
      username: 'joshRips',
    };

    request(app)
      .post('/api/v1/users')
      .set('Accept', accept)
      .send(newUser)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.firstName).to.equal(newUser.firstName);
        expect(res.body.lastName).to.equal(newUser.lastName);
        expect(res.body.email).to.equal(newUser.email);
        expect(res.body.username).to.equal(newUser.username);
        expect(res.body.password).to.equal(newUser.password);
        expect(res.body.phoneNumber).to.equal(newUser.phoneNumber);
        expect(res.body.lastLoginDate).to.equal(newUser.lastLoginDate);
        expect(res.body.addressId).to.equal(newUser.addressId);
        done();
      });
  });
});

const userUpdate: UserAttributes = {
  addressId: 2,
  email: 'josh-new-email@josh.com',
  firstName: 'Josh',
  lastLoginDate: new Date().toISOString(),
  lastName: 'Test',
  password: 'worse',
  phoneNumber: '7777777777',
  username: 'joshRips',
};

describe('PATCH /api/v1/users', () => {
  it('updates the given user id', done => {
    request(app)
      .patch(`/api/v1/users/${createdId}`)
      .set('Accept', accept)
      .send(userUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].firstName).to.equal(userUpdate.firstName);
        expect(res.body[1][0].lastName).to.equal(userUpdate.lastName);
        expect(res.body[1][0].email).to.equal(userUpdate.email);
        expect(res.body[1][0].username).to.equal(userUpdate.username);
        expect(res.body[1][0].password).to.equal(userUpdate.password);
        expect(res.body[1][0].phoneNumber).to.equal(userUpdate.phoneNumber);
        expect(res.body[1][0].lastLoginDate).to.equal(userUpdate.lastLoginDate);
        expect(res.body[1][0].addressId).to.equal(userUpdate.addressId);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', done => {
    request(app)
      .patch(`/api/v1/users/${createdId + 10}`)
      .set('Accept', accept)
      .send(userUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /api/v1/users', () => {
  it('deletes the given user id', done => {
    request(app)
      .delete(`/api/v1/users/${createdId}`)
      .set('Accept', accept)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].firstName).to.equal(userUpdate.firstName);
        expect(res.body[0].lastName).to.equal(userUpdate.lastName);
        expect(res.body[0].email).to.equal(userUpdate.email);
        expect(res.body[0].username).to.equal(userUpdate.username);
        expect(res.body[0].password).to.equal(userUpdate.password);
        expect(res.body[0].phoneNumber).to.equal(userUpdate.phoneNumber);
        expect(res.body[0].lastLoginDate).to.equal(userUpdate.lastLoginDate);
        expect(res.body[0].addressId).to.equal(userUpdate.addressId);
        done();
      });
  });
});
