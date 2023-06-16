import { Router } from 'express';
import commentController from '../controllers/commentController';

const commentRouter = Router();

commentRouter.post('/:id', commentController.create);
commentRouter.put('/toggle/:id', commentController.toggle);
commentRouter.put('/:id', commentController.update);

export default commentRouter;
