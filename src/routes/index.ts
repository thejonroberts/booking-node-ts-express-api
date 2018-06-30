import { NextFunction, Request, Response, Router } from 'express';

import admin from './admin';
import apiV1 from './api/v1';

const router = Router();
// TODO: - convert req toLowerCase() ?
// router.get('/api/v1/endpoints', (req: Request, res: Response, next: NextFunction) => {
//   const routes = {
//     endpoints: [
//       '/addresses',
//       '/bands',
//       '/shows',
//       '/genres',
//       '/users',
//       '/venues',
//     ],
//   };
//   next(res.status(200).json(routes));
// });

router.use('/admin', admin);
router.use('/api/v1', apiV1);

router.get('*', (req, res, next) => {
  res.status(404);
  // TODO: redirect to root, flash.
  next(`${req.path} does not exist. See /endpoints`);
});

export default router;
