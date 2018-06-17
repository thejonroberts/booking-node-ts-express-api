import { NextFunction, Request, Response, Router } from 'express';

import addressRoute from './address';
import authenticationRoute from './authentication';
import bandRoute from './band';
import eventRoute from './event';
import genreRoute from './genre';
import userRoute from './user';
import venueRoute from './venue';

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

router.use('./authentication', authenticationRoute);
router.use('/addresses', addressRoute);
router.use('/bands', bandRoute);
router.use('/events', eventRoute);
router.use('/genres', genreRoute);
router.use('/users', userRoute);
router.use('/venues', venueRoute);

router.get('*', (req, res, next) => {
  // request at bad route
  setImmediate(() => {
    res.status(404);
    next(new Error(`${req.path} does not exist`));
  });
});

export default router;
