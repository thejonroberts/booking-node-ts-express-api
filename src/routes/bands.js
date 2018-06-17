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

router
  .route('/bands')
  .get(getAll)
  .post(create);
router
  .route('/bands/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

module.exports = router;
