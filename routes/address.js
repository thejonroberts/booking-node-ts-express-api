'use strict';

const { Router } = require('express');
const router = Router();

const {
  create,
  deleteId,
  getAll,
  getId,
  updateId,
} = require('../controllers/address');

router.get('/addresses', getAll);
router.get('/addresses/:id', getId);
router.post('/addresses', create);
router.patch('/addresses/:id', updateId);
router.delete('/addresses/:id', deleteId);

module.exports = router;
