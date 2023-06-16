import { Router } from 'express';
import authorController from '../controllers/authorController';

const authorRouter = Router();

authorRouter.get('/:id', authorController.getAuthor);
authorRouter.get('/', authorController.getAllAuthor);

export default authorRouter;
