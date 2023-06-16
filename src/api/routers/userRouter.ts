import { Router } from 'express';
import { isAdmin } from '../../middleware/helper';
import userController from '../controllers/userController';
const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.put('/toggle/:id', isAdmin, userController.toggle);

export default userRouter;
