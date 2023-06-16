import { Router } from 'express';
import { isAdmin } from '../../middleware/helper';
import reactionController from '../controllers/reactionController';

const reactionRouter = Router();

reactionRouter.post('/:id', reactionController.create);
reactionRouter.delete('/:id', isAdmin, reactionController.remove);

export default reactionRouter;
