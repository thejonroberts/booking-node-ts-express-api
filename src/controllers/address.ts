import { NextFunction, Request, Response } from 'express';

// TODO: http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations

export function getAll(req: Request, res: Response, next: NextFunction): void {
  const { Address } = req.app.get('models');
  Address.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
}

export function create(req: Request, res: Response, next: NextFunction) {
  const { Address } = req.app.get('models');
  const address = new Address(req.body);
  address
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      next(err);
    });
}

export function getId(req: Request, res: Response, next: NextFunction): void {
  const { Address } = req.app.get('models');
  Address.findById(req.params.id, {})
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
  const { Address } = req.app.get('models');
  Address.update(req.body, {
    returning: true,
    where: {
      id: req.params.id,
    },
  })
    .then(response => {
      res
      .status(200)
      .json(response);
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
  const { Address } = req.app.get('models');
  Address.destroy({
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
