'use strict';

module.exports.getAll = (req, res, next) => {
  const { Address, User, Venue } = req.app.get('models');
  Address.findAll({
    include: [
      {
        model: Venue,
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
