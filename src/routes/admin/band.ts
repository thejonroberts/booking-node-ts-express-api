import { Router } from 'express';
const band = Router();

import { create, deleteId, editId, getAll, getId, showEditForm, updateId } from '../../controllers/admin/band';

band
  .route('/')
  .get(getAll)
  .post(create);
band
  .route('/new')
  .get(showEditForm);
band
  // TODO: check that id params is a number / guard
  .route('/:id/edit')
  .get(editId)
  .post(updateId);
band
  .route('/:id/delete')
  .post(deleteId);
band
  .route('/:id')
  .get(getId);
  // .patch(updateId)
  // .delete(deleteId);

export default band;
