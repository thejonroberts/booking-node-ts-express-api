'use strict';

module.exports.getAll = (req, res, next) => {
  const { Genre } = req.app.get('models');
  Genre.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(next);
};
