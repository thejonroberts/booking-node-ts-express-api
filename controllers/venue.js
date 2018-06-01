'use strict';

module.exports.getAll = (req, res, next) => {
  const { Event, User, Venue } = req.app.get('models');
  Venue.findAll({
    include: [
      {
        model: Event,
      },
      {
        model: User,
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
