'use strict';

const { Router } = require('express');
const router = Router();

const { register, login, logout } = require('../controllers/authentication.js');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
