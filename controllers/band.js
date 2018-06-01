'use strict';

module.exports.getAll = (req, res, next) => {
  const { Band, Event, User } = req.app.get('models');
  Band.findAll({
    include: [
      {
        model: User,
      },
      {
        model: Event,
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
