import { NextFunction, Request, Response } from 'express';

export function getAll(req: Request, res: Response, next: NextFunction): void {
  const { Event } = req.app.get('models');
  Event.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
}

export function create(req: Request, res: Response, next: NextFunction): void {
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
}

export function getId(req: Request, res: Response, next: NextFunction): void {
  const { Band, Event, Venue } = req.app.get('models');
  Event.findById(req.params.id, {
    include: [{ model: Band }, { model: Venue }],
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
  const { Event } = req.app.get('models');
  Event.update(req.body, {
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
  const { Event } = req.app.get('models');
  Event.destroy({
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
