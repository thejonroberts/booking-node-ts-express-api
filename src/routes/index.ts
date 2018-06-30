import { NextFunction, Request, Response, Router } from 'express';

import admin from './admin';
import apiV1 from './api/v1';

const router = Router();

router.use('/admin', admin);
router.use('/api/v1', apiV1);

router.get('*', (req, res, next) => {
  res.status(404);
  // TODO: redirect to root, flash.
  next(`${req.path} does not exist. See /endpoints`);
});

export default router;
