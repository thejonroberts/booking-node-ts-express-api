import { NextFunction, Request, Response } from 'express';
import { BandAttributes } from '../../models/band';

export function getAll(req: Request, res: Response, next: NextFunction): void {
    const { Band } = req.app.get('models');
    Band.findAll()
    .then((data: BandAttributes[]) => {
      res.status(200).json(data);
    })
    // TODO: what is the proper sequelize error handling here?
    .catch((error: Error) => {
      next(error);
    });
}

export function create(req: Request, res: Response, next: NextFunction): void {
  const { Band } = req.app.get('models');
  const band = new Band(req.body);
  band
    .save()
    .then((data: BandAttributes) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      next(error);
    });
}

export function getId(req: Request, res: Response, next: NextFunction): void {
  const { Band, Show, User } = req.app.get('models');
  Band.findById(req.params.id, {
    include: [{ model: User }, { model: Show }],
  })
    .then((data: BandAttributes) => {
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
  const { Band } = req.app.get('models');
  Band.update(req.body, { returning: true, where: { id: req.params.id } })
    .then((data: BandAttributes) => {
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
  const { Band } = req.app.get('models');
  Band.destroy({ returning: true, where: { id: req.params.id } })
    .then((data: BandAttributes) => {
      res.status(200).json(data);
    })
    .catch((error: Error) => {
      next(error);
    });
}
