// tslint:disable no-implicit-dependencies
import * as chai from 'chai';
import request from 'supertest';
import app from '../dist/server';

const expect = chai.expect;
const accept = 'application/json';

describe('GET /shows', () => {
  it('responds with json array', done => {
    request(app)
      .get('/shows')
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

let createdId;

describe('POST /shows', () => {
  it('responds with created show', done => {
    const newShow = {
      VenueId: 1,
      description: 'A smasher',
      endsAt: new Date('December 17, 2016 23:59:00').toISOString(),
      startsAt: new Date('December 17, 2016 02:00:00').toISOString(),
      title: 'Hootenanny',
    };

    request(app)
      .post('/shows')
      .set('Accept', accept)
      .send(newShow)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.startsAt).to.equal(newShow.startsAt);
        expect(res.body.endsAt).to.equal(newShow.endsAt);
        expect(res.body.title).to.equal(newShow.title);
        expect(res.body.description).to.equal(newShow.description);
        expect(res.body.VenueId).to.equal(newShow.VenueId);
        done();
      });
  });
});

const showUpdate = {
  VenueId: 2,
  description: 'A really good time',
  endsAt: new Date('January 17, 2020 23:59:00').toISOString(),
  startsAt: new Date('January 17, 2020 02:00:00').toISOString(),
  title: 'Champagne Jam',
};

describe('PATCH /shows', () => {
  it('updates the given show id', done => {
    request(app)
      .patch(`/shows/${createdId}`)
      .set('Accept', accept)
      .send(showUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].startsAt).to.equal(showUpdate.startsAt);
        expect(res.body[1][0].endsAt).to.equal(showUpdate.endsAt);
        expect(res.body[1][0].title).to.equal(showUpdate.title);
        expect(res.body[1][0].description).to.equal(showUpdate.description);
        expect(res.body[1][0].VenueId).to.equal(showUpdate.VenueId);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', done => {
    request(app)
      .patch(`/shows/${createdId + 10}`)
      .set('Accept', accept)
      .send(showUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /shows', () => {
  it('deletes the given show id', done => {
    request(app)
      .delete(`/shows/${createdId}`)
      .set('Accept', accept)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].startsAt).to.equal(showUpdate.startsAt);
        expect(res.body[0].endsAt).to.equal(showUpdate.endsAt);
        expect(res.body[0].title).to.equal(showUpdate.title);
        expect(res.body[0].description).to.equal(showUpdate.description);
        expect(res.body[0].VenueId).to.equal(showUpdate.VenueId);
        expect(res.body[0].deletedAt).to.be.a('string');
        done();
      });
  });
});
