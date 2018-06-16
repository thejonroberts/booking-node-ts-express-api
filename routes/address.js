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
const { isLoggedIn } = require('../controllers/authentication');

router
  .route('/addresses')
  // .get(isLoggedIn, getAll)
  // .post(isLoggedIn, create);
  .get(getAll)
  .post(create);
router
  .route('/addresses/:id')
  // .get(isLoggedIn, getId)
  // .patch(isLoggedIn, updateId)
  // .delete(isLoggedIn, deleteId);
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

module.exports = router;
