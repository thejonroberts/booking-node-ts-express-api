const { request, expect } = require('./setup');

describe('GET /events', function() {
  it('responds with json array', function(done) {
    request
      .get('/events')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

let createdId;

describe('POST /events', function() {
  it('responds with created event', function(done) {
    const newEvent = {
      startsAt: new Date('December 17, 2016 02:00:00').toISOString(),
      endsAt: new Date('December 17, 2016 23:59:00').toISOString(),
      title: 'Hootenanny',
      description: 'A smasher',
      VenueId: 1,
    };

    request
      .post('/events')
      .set('Accept', 'application/json')
      .send(newEvent)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
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
  startsAt: new Date('January 17, 2020 02:00:00').toISOString(),
  endsAt: new Date('January 17, 2020 23:59:00').toISOString(),
  title: 'Champagne Jam',
  description: 'A hootin tootin good time',
  VenueId: 2,
};

describe('PATCH /events', function() {
  it('updates the given event id', function(done) {
    request
      .patch(`/events/${createdId}`)
      .set('Accept', 'application/json')
      .send(eventUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].startsAt).to.equal(eventUpdate.startsAt);
        expect(res.body[1][0].endsAt).to.equal(eventUpdate.endsAt);
        expect(res.body[1][0].title).to.equal(eventUpdate.title);
        expect(res.body[1][0].description).to.equal(eventUpdate.description);
        expect(res.body[1][0].VenueId).to.equal(eventUpdate.VenueId);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', function(done) {
    request
      .patch(`/events/${createdId + 10}`)
      .set('Accept', 'application/json')
      .send(eventUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /events', function() {
  it('deletes the given event id', function(done) {
    request
      .delete(`/events/${createdId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
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
