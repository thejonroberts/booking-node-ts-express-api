import { Router } from 'express';
const user = Router();

import { create, deleteId, getAll, getId, updateId } from '../controllers/user';

user
  .route('/')
  .get(getAll)
  .post(create);
user
  .route('/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

export default user;
