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

router
  .route('/venues')
  .get(getAll)
  .post(create);

router
  .route('/venues/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

module.exports = router;
