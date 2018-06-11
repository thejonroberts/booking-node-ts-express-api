const { request, expect } = require('./setup');

describe('GET /users', function() {
  it('responds with json array', function(done) {
    request
      .get('/users')
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

describe('POST /users', function() {
  it('responds with created user', function(done) {
    const newUser = {
      firstName: 'Josh',
      lastName: 'Test',
      email: 'josh@josh.com',
      username: 'joshrips',
      password: 'insecure',
      phoneNumber: '5555555555',
      lastLoginDate: new Date('December 17, 2016 02:00:00').toISOString(),
      AddressId: 1,
    };

    request
      .post('/users')
      .set('Accept', 'application/json')
      .send(newUser)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        createdId = parseInt(res.body.id, 10);
        expect(res.body.name).to.equal(newUser.name);
        done();
      });
  });
});

const userUpdate = {
  firstName: 'Josh',
  lastName: 'Test',
  email: 'josh-new-email@josh.com',
  username: 'joshrips',
  password: 'worse',
  phoneNumber: '7777777777',
  lastLoginDate: new Date().toISOString(),
};

describe('PATCH /users', function() {
  it('updates the given user id', function(done) {
    request
      .patch(`/users/${createdId}`)
      .set('Accept', 'application/json')
      .send(userUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[1][0]).to.be.an('object');
        expect(res.body[1][0].name).to.equal(userUpdate.name);
        done();
      });
  });

  it('returns 0 rows updated for non-existent id', function(done) {
    request
      .patch(`/users/${createdId + 10}`)
      .set('Accept', 'application/json')
      .send(userUpdate)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]).to.be.equal(0);
        done();
      });
  });
});

describe('DELETE /users', function() {
  it('deletes the given user id', function(done) {
    request
      .delete(`/users/${createdId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].name).to.equal(userUpdate.name);
        expect(res.body[0].deletedAt).to.be.a('string');
        done();
      });
  });
});
