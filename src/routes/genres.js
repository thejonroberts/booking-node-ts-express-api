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

router
  .route('/genres')
  .get(getAll)
  .post(create);

router
  .route('/genres/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

module.exports = router;
