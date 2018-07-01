import { Router } from 'express';
const band = Router();

import { create, deleteId, editId, getAll, getId, updateId } from '../../controllers/admin/band';

band
  .route('/')
  .get(getAll);
  // .post(create);
band
  .route('/:id/edit')
  .get(editId)
  .post(updateId);
band
  .route('/:id')
  .get(getId);
  // .patch(updateId)
  // .delete(deleteId);

export default band;
