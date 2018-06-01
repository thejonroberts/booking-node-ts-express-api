'use strict';

const { Router } = require('express');
const router = Router();

const { getAll } = require('../controllers/band');

router.get('/bands', getAll);

module.exports = router;
