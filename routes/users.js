'use strict';

const { Router } = require('express');
const router = Router();

const {
  create,
  deleteId,
  getAll,
  getId,
  updateId,
} = require('../controllers/user');

router.get('/users', getAll);
router.get('/users/:id', getId);
router.post('/users', create);
router.patch('/users/:id', updateId);
router.delete('/users/:id', deleteId);

module.exports = router;
