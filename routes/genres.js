'use strict';

const { Router } = require('express');
const router = Router();

const { getAll } = require('../controllers/genre');

router.get('/genres', getAll);

module.exports = router;
