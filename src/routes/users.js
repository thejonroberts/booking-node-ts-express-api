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

router
  .route('/users')
  .get(getAll)
  .post(create);
router
  .route('/users/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

module.exports = router;
