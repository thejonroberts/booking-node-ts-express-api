import { NextFunction, Request, Response, Router } from 'express';

import address from './address';
import authentication from './authentication';
import band from './band';
import event from './event';
import genre from './genre';
import user from './user';
import venue from './venue';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const routes = {
    endpoints: [
      '/addresses',
      '/bands',
      '/events',
      '/genres',
      '/users',
      '/venues'
    ]
  };
  next(res.status(200).json(routes));
});

router.use('./authentication', authentication);
router.use('/addresses', address);
router.use('/bands', band);
router.use('/events', event);
router.use('/genres', genre);
router.use('/users', user);
router.use('/venues', venue);

router.get('*', (req, res, next) => {
  // request at bad route
  setImmediate(() => {
    res.status(404);
    next(new Error(`${req.path} does not exist`));
  });
});

export default router;
