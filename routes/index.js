'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  const testData = {
    key: "data",
    keyAgain: "other Data",
    fakeArray: [1, 2, 3],
  }
  // console.log('root', testData);
  res.json(testData);
  next();
});

// pipe all other requests through the route modules

module.exports = router;
