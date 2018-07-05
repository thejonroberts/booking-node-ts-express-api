import { Router } from 'express';

import {
  create,
  deleteId,
  getAll,
  getId,
  updateId,
} from '../../controllers/api/address';

// TODO: implement auth guards
// const { isLoggedIn } = require('../controllers/authentication');

const addressRoute = Router();

addressRoute
  .route('/')
  // .get(isLoggedIn, getAll)
  // .post(isLoggedIn, create);
  .get(getAll)
  .post(create);
addressRoute
  .route('/:id')
  // .get(isLoggedIn, getId)
  // .patch(isLoggedIn, updateId)
  // .delete(isLoggedIn, deleteId);
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

export default addressRoute;
