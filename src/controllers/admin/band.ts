import { NextFunction, Request, Response } from 'express';
import { AddressAttributes } from '../../models/address';
import { BandAttributes } from '../../models/band';
import { GenreAttributes } from '../../models/genre';

export function getAll(req: Request, res: Response, next: NextFunction): void {
  const { Address, Band, Genre } = req.app.get('models');
  Band.findAll({
    include: [{ model: Genre }, { model: Address }],
  })
  .then((bands: BandAttributes[]) => {
    res.render('band/index', {bands});
  })
  .catch((error: Error) => {
    next(error);
    });
}

export function create(req: Request, res: Response, next: NextFunction): void {
  const { Address, Band } = req.app.get('models');
  const newBand = new Band(req.body.band);
  const newAddress = new Address(req.body.address);
  newAddress.save()
  .then((address: AddressAttributes) => {
    newBand.addressId = address.id;
    return newBand.save()
    .then((band: BandAttributes) => {
      return res.redirect(`bands/${band.id}`);
    });
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

export function showEditForm(req: Request, res: Response, next: NextFunction): void {
  const { Band, Address, Genre } = req.app.get('models');
  // NOTE: need these band.attributes to render the empty form!
  const band = new Band();
  const address = new Address();
  band.address = address;
  band.genre = {
    id: null,
  };
  Genre.findAll()
  .then((genres: GenreAttributes[]) => {
    res.render('band/new', ({band, genres}));
  })
  .catch((error: Error) => {
    next(error);
  });
}

export function editId(req: Request, res: Response, next: NextFunction): void {
  const { Address, Band, Genre } = req.app.get('models');
  Band.findById(req.params.id, {
    include: [{ model: Genre }, { model: Address }],
  })
  .then((band: BandAttributes) => {
    return Genre.findAll()
    .then((genres: GenreAttributes[]) => {
      res.render('band/edit', {band, genres});
    });
  })
  .catch((error: any) => {
    next(error);
  });
}

export function updateId(req: Request, res: Response, next: NextFunction): void {
  const { Address, Band } = req.app.get('models');
  // TODO: lint rule for this format?
  Band.update(
    req.body.band, {
      where: {
      id: req.params.id,
    },
  })
  .then((bandDetails: BandAttributes) => {
    return Address.update(req.body.address, { where: { id: req.body.address.id } })
    .then((address: AddressAttributes) => {
      res.redirect(`/bands/${req.params.id}`);
    });
  })
  .catch((error: Error) => {
    next(error);
  });
}

export function deleteId(req: Request, res: Response, next: NextFunction): void {
  const { Band } = req.app.get('models');
  Band.destroy({
      where: { id: req.params.id },
  })
  .then((data: BandAttributes) => {
    res.render('band/index', data);
  })
  .catch((error: Error) => {
    next(error);
  });
}
