'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  const routes = {
    endpoints: [
      '/addresses',
      '/bands',
      '/events',
      '/genres',
      '/users',
      '/venues',
    ],
  };
  next(res.json(routes));
});

router.use(require('./authentication'));
router.use(require('./address'));
router.use(require('./bands'));
router.use(require('./events'));
router.use(require('./genres'));
router.use(require('./users'));
router.use(require('./venues'));

module.exports = router;
