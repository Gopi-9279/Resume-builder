import {Router} from 'express';
import {getMeController, logoutUserController, registerUserController} from '../controllers/auth.controller.js'
import { loginUserController } from '../controllers/auth.controller.js';
import { authuser } from '../middlewares/auth.middleware.js';
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

/**
 * - @route GET /api/auth/logout
 * - @description clear token from user cookie and add token in blacklist 
 * - @access public
 */
authRouter.get("/logout",logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */

authRouter.get("/get-me",authuser,getMeController)
export  {authRouter} 