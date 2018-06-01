'use strict';

const { Router } = require('express');
const router = Router();

const { getAll } = require('../controllers/event');

router.get('/events', getAll);

module.exports = router;
