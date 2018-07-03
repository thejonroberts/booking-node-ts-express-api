import { NextFunction, Request, Response } from 'express';
import { BandAttributes } from '../../models/band';

export function getAll(req: Request, res: Response, next: NextFunction): void {
    const { Band, Genre } = req.app.get('models');
    Band.findAll({
      include: [{ model: Genre }],
    })
    .then((bands: BandAttributes[]) => {
      res.render('band/index', {bands});
    })
    .catch((error: Error) => {
      next(error);
    });
}

export function create(req: Request, res: Response, next: NextFunction): void {
  const { Band } = req.app.get('models');
  const band = new Band(req.body);
  band
    .save()
    .then((bandDetails: BandAttributes) => {
      // res.json(data);
      res.render('band/show', {bandDetails});
    })
    .catch((error: Error) => {
      next(error);
    });
}

export function getId(req: Request, res: Response, next: NextFunction): void {
  const { Band, Genre, Show, User } = req.app.get('models');
  Band.findById(req.params.id, {
    include: [{ model: User }, { model: Show }, { model: Genre }],
  })
    .then((bandDetails: BandAttributes) => {
      res.render('band/show', {bandDetails});
    })
    .catch((error: Error) => {
      next(error);
    });
}

export function editId(req: Request, res: Response, next: NextFunction): void {
  const { Band, Show, User } = req.app.get('models');
  Band.findById(req.params.id, {})
    .then((bandDetails: BandAttributes) => {
      res.render('band/edit', {bandDetails});
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
    .then((bandDetails: BandAttributes) => {
      // res.json(bandDetails);
      res.render('band/show', {bandDetails});
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
      // res.json(data);
      res.render('band/index', data);
    })
    .catch((error: Error) => {
      next(error);
    });
}
