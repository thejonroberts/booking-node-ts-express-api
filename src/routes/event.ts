import { Router } from 'express';
const event = Router();

import {
  create,
  deleteId,
  getAll,
  getId,
  updateId,
} from '../controllers/event';

event
  .route('/')
  .get(getAll)
  .post(create);

event
  .route('/:id')
  .get(getId)
  .patch(updateId)
  .delete(deleteId);

export default event;
