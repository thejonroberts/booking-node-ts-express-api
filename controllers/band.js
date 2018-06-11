'use strict';

module.exports.getAll = (req, res, next) => {
  const { Band } = req.app.get('models');
  Band.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.create = (req, res, next) => {
  const { Band } = req.app.get('models');
  const band = new Band(req.body);
  band
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getId = (req, res, next) => {
  const { Band } = req.app.get('models');
  Band.findById(req.params.id, {})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.updateId = (req, res, next) => {
  const { Band } = req.app.get('models');
  Band.update(req.body, { returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.deleteId = (req, res, next) => {
  const { Band } = req.app.get('models');
  Band.destroy({ returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};
