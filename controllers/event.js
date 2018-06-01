'use strict';

module.exports.getAll = (req, res, next) => {
  const { Band, Event, Venue } = req.app.get('models');
  Event.findAll({
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
