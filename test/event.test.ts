// tslint:disable no-implicit-dependencies
import * as chai from 'chai';
import request from 'supertest';
import app from '../src/server';

const expect = chai.expect;
const accept = 'application/json';

describe('GET /events', () => {
  it('responds with json array', done => {
    request(app)
      .get('/events')
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

describe('POST /events', () => {
  it('responds with created event', done => {
    const newEvent = {
      VenueId: 1,
      description: 'A smasher',
      endsAt: new Date('December 17, 2016 23:59:00').toISOString(),
      startsAt: new Date('December 17, 2016 02:00:00').toISOString(),
      title: 'Hootenanny',
    };

    request(app)
      .post('/events')
      .set('Accept', accept)
      .send(newEvent)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.startsAt).to.equal(newEvent.startsAt);
        expect(res.body.endsAt).to.equal(newEvent.endsAt);
        expect(res.body.title).to.equal(newEvent.title);
        expect(res.body.description).to.equal(newEvent.description);
        expect(res.body.VenueId).to.equal(newEvent.VenueId);
        done();
      });
  });
});

const eventUpdate = {
  VenueId: 2,
  description: 'A hootin tootin good time',
  endsAt: new Date('January 17, 2020 23:59:00').toISOString(),
  startsAt: new Date('January 17, 2020 02:00:00').toISOString(),
  title: 'Champagne Jam',
};

describe('PATCH /events', () => {
  it('updates the given event id', done => {
    request(app)
      .patch(`/events/${createdId}`)
      .set('Accept', accept)
      .send(eventUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].startsAt).to.equal(eventUpdate.startsAt);
        expect(res.body[1][0].endsAt).to.equal(eventUpdate.endsAt);
        expect(res.body[1][0].title).to.equal(eventUpdate.title);
        expect(res.body[1][0].description).to.equal(eventUpdate.description);
        expect(res.body[1][0].VenueId).to.equal(eventUpdate.VenueId);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', done => {
    request(app)
      .patch(`/events/${createdId + 10}`)
      .set('Accept', accept)
      .send(eventUpdate)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /events', () => {
  it('deletes the given event id', done => {
    request(app)
      .delete(`/events/${createdId}`)
      .set('Accept', accept)
      .expect(200)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].startsAt).to.equal(eventUpdate.startsAt);
        expect(res.body[0].endsAt).to.equal(eventUpdate.endsAt);
        expect(res.body[0].title).to.equal(eventUpdate.title);
        expect(res.body[0].description).to.equal(eventUpdate.description);
        expect(res.body[0].VenueId).to.equal(eventUpdate.VenueId);
        expect(res.body[0].deletedAt).to.be.a('string');
        done();
      });
  });
});
