'use strict';

const { Router } = require('express');
const router = Router();

const {
  create,
  deleteId,
  getAll,
  getId,
  updateId,
} = require('../controllers/band');

router.get('/bands', getAll);
router.get('/bands/:id', getId);
router.post('/bands', create);
router.patch('/bands/:id', updateId);
router.delete('/bands/:id', deleteId);

module.exports = router;
