'use strict';

module.exports.getAll = (req, res, next) => {
  const { Band } = req.app.get('models');
  Band.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(next);
};
