import { Router } from 'express';
const show = Router();

import {
  create,
  deleteId,
  getAll,
  getId,
  updateId,
} from '../../../controllers/show';

show
  .route('/')
  .get(getAll)
  .post(create);

show
  .route('/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

export default show;
