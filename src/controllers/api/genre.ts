import { NextFunction, Request, Response } from 'express';
import { GenreAttributes } from '../../models/genre';

export function getAll(req: Request, res: Response, next: NextFunction): void {
  const { Genre } = req.app.get('models');
  Genre.findAll()
    .then((data: GenreAttributes) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      next(error);
    });
}

export function create(req: Request, res: Response, next: NextFunction): void {
  const { Genre } = req.app.get('models');
  const genre = new Genre(req.body);
  genre
    .save()
    .then((data: GenreAttributes) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      next(error);
    });
}

export function getId(req: Request, res: Response, next: NextFunction): void {
  const { Band, Genre, Venue } = req.app.get('models');
  Genre.findById(req.params.id, {
    include: [
      {
        model: Band,
      },
      {
        model: Venue,
      },
    ],
  })
    .then((data: GenreAttributes) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      next(error);
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
    .then((data: GenreAttributes) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      next(error);
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
    .then((data: GenreAttributes) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      next(error);
    });
}
