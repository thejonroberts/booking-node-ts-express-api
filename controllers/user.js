'use strict';

module.exports.getAll = (req, res, next) => {
  const { User } = req.app.get('models');
  User.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.create = (req, res, next) => {
  const { User } = req.app.get('models');
  const user = new User(req.body);
  user
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getId = (req, res, next) => {
  const { Band, User, Venue } = req.app.get('models');
  User.findById(req.params.id, {
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
  const { User } = req.app.get('models');
  User.update(req.body, { returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.deleteId = (req, res, next) => {
  const { User } = req.app.get('models');
  User.destroy({ returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};
