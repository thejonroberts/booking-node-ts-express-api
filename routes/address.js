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

router
  .route('/addresses')
  .get(getAll)
  .post(create);
router
  .route('/addresses/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

module.exports = router;
