import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  switch (error.name) {
    case 'SequelizeUniqueConstraintError':
      if (error.errors[0].message === 'slug must be unique') {
        return res
          .status(400)
          .json('Title must be unique. Also check the empty spaces in title.');
      }
      return res.status(400).json(error.errors[0].message as string);
    case 'SequelizeValidationError':
      return res.status(400).json(error.errors[0].message as string);
    default:
      return res.status(400).json(error.message as string);
  }
  next(error);
};
