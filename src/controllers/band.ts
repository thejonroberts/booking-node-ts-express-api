import { NextFunction, Request, Response } from 'express';

export function getAll(req: Request, res: Response, next: NextFunction): void {
  const { Band } = req.app.get('models');
  Band.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
}

export function create(req: Request, res: Response, next: NextFunction): void {
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
}

export function getId(req: Request, res: Response, next: NextFunction): void {
  const { Band, Event, User } = req.app.get('models');
  Band.findById(req.params.id, {
    include: [{ model: User }, { model: Event }],
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
  const { Band } = req.app.get('models');
  Band.update(req.body, { returning: true, where: { id: req.params.id } })
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
  const { Band } = req.app.get('models');
  Band.destroy({ returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
}
