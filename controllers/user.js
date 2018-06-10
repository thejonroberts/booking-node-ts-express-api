'use strict';

module.exports.getAll = (req, res, next) => {
  const { User } = req.app.get('models');
  User.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(next);
};
