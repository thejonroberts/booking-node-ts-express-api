'use strict';

module.exports.getAll = (req, res, next) => {
  const { Venue } = req.app.get('models');
  Venue.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(next);
};
