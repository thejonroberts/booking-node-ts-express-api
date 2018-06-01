'use strict';

const { Router } = require('express');
const router = Router();

const { getAll } = require('../controllers/address');

router.get('/addresses', getAll);

module.exports = router;
