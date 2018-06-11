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
        expect(res.body.firstName).to.equal(newUser.firstName);
        expect(res.body.lastName).to.equal(newUser.lastName);
        expect(res.body.email).to.equal(newUser.email);
        expect(res.body.username).to.equal(newUser.username);
        expect(res.body.password).to.equal(newUser.password);
        expect(res.body.phoneNumber).to.equal(newUser.phoneNumber);
        expect(res.body.lastLoginDate).to.equal(newUser.lastLoginDate);
        expect(res.body.AddressId).to.equal(newUser.AddressId);
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
  AddressId: 2,
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
        expect(res.body[1][0].firstName).to.equal(userUpdate.firstName);
        expect(res.body[1][0].lastName).to.equal(userUpdate.lastName);
        expect(res.body[1][0].email).to.equal(userUpdate.email);
        expect(res.body[1][0].username).to.equal(userUpdate.username);
        expect(res.body[1][0].password).to.equal(userUpdate.password);
        expect(res.body[1][0].phoneNumber).to.equal(userUpdate.phoneNumber);
        expect(res.body[1][0].lastLoginDate).to.equal(userUpdate.lastLoginDate);
        expect(res.body[1][0].AddressId).to.equal(userUpdate.AddressId);
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
        expect(res.body[0].firstName).to.equal(userUpdate.firstName);
        expect(res.body[0].lastName).to.equal(userUpdate.lastName);
        expect(res.body[0].email).to.equal(userUpdate.email);
        expect(res.body[0].username).to.equal(userUpdate.username);
        expect(res.body[0].password).to.equal(userUpdate.password);
        expect(res.body[0].phoneNumber).to.equal(userUpdate.phoneNumber);
        expect(res.body[0].lastLoginDate).to.equal(userUpdate.lastLoginDate);
        expect(res.body[0].AddressId).to.equal(userUpdate.AddressId);
        done();
      });
  });
});
