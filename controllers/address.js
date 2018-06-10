'use strict';

module.exports.getAll = (req, res, next) => {
  const { Address } = req.app.get('models');
  Address.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
};
