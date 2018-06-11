'use strict';

const { Router } = require('express');
const router = Router();

const {
  create,
  deleteId,
  getAll,
  getId,
  updateId,
} = require('../controllers/event');

router.get('/events', getAll);
router.get('/events/:id', getId);
router.post('/events', create);
router.patch('/events/:id', updateId);
router.delete('/events/:id', deleteId);

module.exports = router;
