import { Router } from 'express';
const address = Router();

import {
  create,
  deleteId,
  getAll,
  getId,
  updateId
} from '../controllers/address';

// TODO: implement auth guards
// const { isLoggedIn } = require('../controllers/authentication');

address
  .route('/')
  // .get(isLoggedIn, getAll)
  // .post(isLoggedIn, create);
  .get(getAll)
  .post(create);
address
  .route('/:id')
  // .get(isLoggedIn, getId)
  // .patch(isLoggedIn, updateId)
  // .delete(isLoggedIn, deleteId);
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

export default address;
