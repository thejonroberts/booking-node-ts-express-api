'use strict';

module.exports.getAll = (req, res, next) => {
  const { Genre, Venue, Band } = req.app.get('models');
  Genre.findAll({
    include: [
      {
        model: Venue,
      },
      {
        model: Band,
      },
    ],
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
};
