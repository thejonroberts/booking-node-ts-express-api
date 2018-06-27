import { NextFunction, Request, Response } from 'express';
import { AddressAttributes } from '../models/address';

// TODO: http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations
export function getAll(req: Request, res: Response, next: NextFunction): void {
  const { Address } = req.app.get('models');
  Address.findAll()
    .then((data: AddressAttributes[]): void => {
      res.status(200).json(data);
    })
    .catch((err: Error) => {
      next(err);
    });
}

export function create(req: Request, res: Response, next: NextFunction) {
  const { Address } = req.app.get('models');
  const address = new Address(req.body);
  address
    .save()
    .then((response: AddressAttributes) => {
      res.status(200).json(response);
    })
    .catch((err: Error) => {
      next(err);
    });
}

export function getId(req: Request, res: Response, next: NextFunction): void {
  const { Address } = req.app.get('models');
  Address.findById(req.params.id, {})
  // TODO overload / include associations in type??
    .then((data: AddressAttributes): void => {
      res.status(200).json(data);
    })
    .catch((err: Error) => {
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
    .then((response: AddressAttributes) => {
      res
      .status(200)
      .json(response);
    })

    .catch((err: Error) => {
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
    .then((response: number[]) => {
      res.status(200).json(response);
    })
    .catch((err: Error) => {
      next(err);
    });
}
