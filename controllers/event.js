'use strict';

module.exports.getAll = (req, res, next) => {
  const { Event } = req.app.get('models');
  Event.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(next);
};
