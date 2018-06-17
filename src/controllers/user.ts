import { NextFunction, Request, Response } from 'express';

export function getAll(req: Request, res: Response, next: NextFunction): void {
  const { User } = req.app.get('models');
  User.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
}

export function create(req: Request, res: Response, next: NextFunction): void {
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
}

export function getId(req: Request, res: Response, next: NextFunction): void {
  const { Band, User, Venue } = req.app.get('models');
  User.findById(req.params.id, {
    include: [
      {
        model: Band
      },
      {
        model: Venue
      }
    ]
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
  const { User } = req.app.get('models');
  User.update(req.body, { returning: true, where: { id: req.params.id } })
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
  const { User } = req.app.get('models');
  User.destroy({ returning: true, where: { id: req.params.id } })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
}
