'use strict';

module.exports.getAll = (req, res, next) => {
  const { User, Band, Venue } = req.app.get('models');
  User.findAll({
    include: [
      {
        model: Band,
      },
      {
        model: Venue,
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
