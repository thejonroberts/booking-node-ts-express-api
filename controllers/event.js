'use strict';

module.exports.getAll = (req, res, next) => {
  const { Event } = req.app.get('models');
  Event.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.create = (req, res, next) => {
  const { Event } = req.app.get('models');
  const event = new Event(req.body);
  event
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getId = (req, res, next) => {
  const { Band, Event, Venue } = req.app.get('models');
  Event.findById(req.params.id, {
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
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.updateId = (req, res, next) => {
  const { Event } = req.app.get('models');
  Event.update(req.body, { returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.deleteId = (req, res, next) => {
  const { Event } = req.app.get('models');
  Event.destroy({ returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};
