import { RequestHandler } from 'express';
import { errorHandler } from './errorHandler';
const unknownEndpoint: RequestHandler = (req, res) => {
  res.status(404).json({ error: `Unknown Endpoint ${req.originalUrl}` });
};

export { errorHandler, unknownEndpoint };
