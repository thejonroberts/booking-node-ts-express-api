'use strict';

module.exports.getAll = (req, res, next) => {
  const { Venue } = req.app.get('models');
  Venue.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.create = (req, res, next) => {
  const { Venue } = req.app.get('models');
  const venue = new Venue(req.body);
  venue
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getId = (req, res, next) => {
  const { Event, User, Venue } = req.app.get('models');
  Venue.findById(req.params.id, {
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
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.updateId = (req, res, next) => {
  const { Venue } = req.app.get('models');
  Venue.update(req.body, { returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.deleteId = (req, res, next) => {
  const { Venue } = req.app.get('models');
  Venue.destroy({ returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};
