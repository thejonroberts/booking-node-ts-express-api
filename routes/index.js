'use strict';

const { Router } = require('express');
const router = Router();

// latest products shown at root

router.get('/', () => {
  console.log('root');
});

// pipe all other requests through the route modules

module.exports = router;
