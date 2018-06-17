import { NextFunction, Request, Response, Router } from 'express';
import venues from './venues';

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

// TODO: router.use('./authentication');
// router.use('/address');
// router.use('/bands');
// router.use('/events');
// router.use('/genres');
// router.use('/users');
router.use('/venues', venues);

router.get('*', (req, res, next) => {
  // request at bad route
  setImmediate(() => {
    res.status(404);
    next(new Error(`${req.path} does not exist`));
  });
});

export default router;
