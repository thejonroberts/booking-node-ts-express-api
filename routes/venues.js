'use strict';

const { Router } = require('express');
const router = Router();

const {
  create,
  deleteId,
  getAll,
  getId,
  updateId,
} = require('../controllers/venue');

router.get('/venues', getAll);
router.get('/venues/:id', getId);
router.post('/venues', create);
router.patch('/venues/:id', updateId);
router.delete('/venues/:id', deleteId);

module.exports = router;
