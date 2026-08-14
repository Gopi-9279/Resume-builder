import {Router} from 'express';
import {registerUserController} from '../controllers/auth.controller.js'
import { loginUserController } from '../controllers/auth.controller.js';

const authRouter = Router();

/**
 * - @route POST /api/auth/register
 * - @description Register new User
 * - @access public
 */
authRouter.post("/register",registerUserController)
/**
 * - @route POST /api/auth/login
 * - @description Login a user with email and password
 * - @access public
 */
authRouter.post("/login",loginUserController);
export  {authRouter} 