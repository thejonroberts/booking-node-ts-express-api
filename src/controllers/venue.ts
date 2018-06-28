import { NextFunction, Request, Response } from 'express';
import { VenueAttributes } from '../models/venue';

export function getAll(req: Request, res: Response, next: NextFunction): void {
  const { Venue } = req.app.get('models');
  Venue.findAll()
    .then((data: VenueAttributes) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      next(error);
    });
}

export function create(req: Request, res: Response, next: NextFunction): void {
  const { Venue } = req.app.get('models');
  const venue = new Venue(req.body);
  venue
    .save()
    .then((data: VenueAttributes) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      next(error);
    });
}

export function getId(req: Request, res: Response, next: NextFunction): void {
  const { Show, User, Venue } = req.app.get('models');
  Venue.findById(req.params.id, {
    include: [{ model: Show }, { model: User }],
  })
    .then((data: VenueAttributes) => {
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
  const { Venue } = req.app.get('models');
  Venue.update(req.body, {
    returning: true,
    where: { id: req.params.id },
  })
    .then((data: VenueAttributes) => {
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
  const { Venue } = req.app.get('models');
  Venue.destroy({
    returning: true,
    where: { id: req.params.id },
  })
    .then((data: VenueAttributes) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      next(error);
    });
}
