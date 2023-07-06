import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  const errorNumber = Number(error.status) ?? 400;

  switch (error.name) {
    case 'SequelizeUniqueConstraintError':
      if (error.errors[0].message === 'slug must be unique') {
        return res
          .status(errorNumber)
          .json('Title must be unique. Also check the empty spaces in title.');
      }
      return res.status(errorNumber).json(error.errors[0].message);
    case 'SequelizeValidationError':
      return res.status(errorNumber).json(error.errors[0].message);
    default:
      return res.status(errorNumber).json(error.message);
  }
  next(error);
};
