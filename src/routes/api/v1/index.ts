import { NextFunction, Request, Response, Router } from 'express';

import address from './address';
import authentication from './authentication';
import band from './band';
import genre from './genre';
import show from './show';
import user from './user';
import venue from './venue';

const router = Router();

router.use('/authentication', authentication);
router.use('/addresses', address);
router.use('/bands', band);
router.use('/shows', show);
router.use('/genres', genre);
router.use('/users', user);
router.use('/venues', venue);

router.get('*', (req, res, next) => {
  res.status(404);
  // errorHander
  next(`${req.path} does not exist. See /endpoints`);
});

export default router;
