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

router
  .route('/events')
  .get(getAll)
  .post(create);

router
  .route('/events/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

module.exports = router;
