import { NextFunction, Request, Response } from 'express';

export function getAll(req: Request, res: Response, next: NextFunction): void {
  const { Genre } = req.app.get('models');
  Genre.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
}

export function create(req: Request, res: Response, next: NextFunction): void {
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
}

export function getId(req: Request, res: Response, next: NextFunction): void {
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
}

export function updateId(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { Genre } = req.app.get('models');
  Genre.update(req.body, {
    returning: true,
    where: { id: req.params.id },
  })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
}

export function deleteId(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { Genre } = req.app.get('models');
  Genre.destroy({
    returning: true,
    where: { id: req.params.id },
  })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
}
