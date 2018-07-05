import { Router } from 'express';

const venues = Router();

import {
  create,
  deleteId,
  getAll,
  getId,
  updateId,
} from '../../controllers/api/venue';

venues
  .route('/')
  .get(getAll)
  .post(create);

venues
  .route('/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

export default venues;
