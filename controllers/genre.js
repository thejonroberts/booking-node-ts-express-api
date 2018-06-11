'use strict';

module.exports.getAll = (req, res, next) => {
  const { Genre } = req.app.get('models');
  Genre.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.create = (req, res, next) => {
  const { Genre } = req.app.get('models');
  const genre = new Genre(req.body);
  genre
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getId = (req, res, next) => {
  const { Band, Event, Genre } = req.app.get('models');
  Genre.findById(req.params.id, {
    include: [
      {
        model: Band,
      },
      {
        model: Event,
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
  const { Genre } = req.app.get('models');
  Genre.update(req.body, { returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.deleteId = (req, res, next) => {
  const { Genre } = req.app.get('models');
  Genre.destroy({ returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
};
