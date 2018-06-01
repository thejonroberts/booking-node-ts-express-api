'use strict';

const { Router } = require('express');
const router = Router();

const { getAll } = require('../controllers/venue');

router.get('/venues', getAll);

module.exports = router;
