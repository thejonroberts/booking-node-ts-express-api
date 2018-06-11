'use strict';

const { Router } = require('express');
const router = Router();

const {
  create,
  deleteId,
  getAll,
  getId,
  updateId,
} = require('../controllers/genre');

router.get('/genres', getAll);
router.get('/genres/:id', getId);
router.post('/genres', create);
router.patch('/genres/:id', updateId);
router.delete('/genres/:id', deleteId);

module.exports = router;
