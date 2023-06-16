import { Router } from 'express';
import authController from '../controllers/authController';

const authRouter = Router();

authRouter.post('/login', authController.handleLogin);
authRouter.post('/logout', authController.handleLogout);
authRouter.get('/session', authController.isSessionAuthenticated);

export default authRouter;
