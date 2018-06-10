require('dotenv').config();
const app = require('../server');
const { expect } = require('chai');
const request = require('supertest').agent(app.listen());

module.exports = { request, expect };
