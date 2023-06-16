import { Router } from 'express';
import testController from '../controllers/testController';

const testRouter = Router();

testRouter.post('/reset', testController.resetDatabase);

export default testRouter;
