import { Router } from 'express';
const band = Router();

import { create, deleteId, getAll, getId, updateId } from '../../../controllers/api/band';

band
  .route('/')
  .get(getAll)
  .post(create);
band
  .route('/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

export default band;
