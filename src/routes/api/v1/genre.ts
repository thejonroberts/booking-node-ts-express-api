import { Router } from 'express';
const genre = Router();

import {
  create,
  deleteId,
  getAll,
  getId,
  updateId,
} from '../../../controllers/api/genre';

genre
  .route('/')
  .get(getAll)
  .post(create);

genre
  .route('/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

export default genre;
