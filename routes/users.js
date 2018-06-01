'use strict';

const { Router } = require('express');
const router = Router();

const { getAll } = require('../controllers/user');

router.get('/users', getAll);

module.exports = router;
