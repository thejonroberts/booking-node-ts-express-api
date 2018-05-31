'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  const { Event } = req.app.get('models');
  Event.findAll()
    .then(data => {
      // data.productTypes = data.map(trainee => {
      //   return Object.assign({}, trainee.dataValues);
      // });
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// pipe all other requests through the route modules

module.exports = router;
