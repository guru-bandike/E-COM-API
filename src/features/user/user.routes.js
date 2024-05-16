import express from 'express';
import UserController from './user.controller.js';
import validateUserDetails from '../../middlewares/validateUserDetails.validation.middleware.js';

const userRouter = express.Router();
const userController = new UserController();


userRouter.post('/signup', validateUserDetails, userController.signUp);
userRouter.post('/login', userController.login);

export default userRouter;