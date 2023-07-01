import { Router } from 'express';
import { isAdmin } from '../../middleware/helper';
import userController from '../controllers/userController';
import { profilePicUpload } from '../../middleware/imageUpload';
const userRouter = Router();

userRouter.post('/', profilePicUpload.single('image'), userController.create);
userRouter.put('/toggle/:id', isAdmin, userController.toggle);

export default userRouter;
