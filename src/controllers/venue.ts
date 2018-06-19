import { NextFunction, Request, Response } from 'express';

export function getAll(req: Request, res: Response, next: NextFunction): void {
  const { Venue } = req.app.get('models');
  Venue.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
}

export function create(req: Request, res: Response, next: NextFunction): void {
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
}

export function getId(req: Request, res: Response, next: NextFunction): void {
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
}

export function updateId(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { Venue } = req.app.get('models');
  Venue.update(req.body, { returning: true, where: { id: req.params.id } })
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
  const { Venue } = req.app.get('models');
  Venue.destroy({ returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
}
