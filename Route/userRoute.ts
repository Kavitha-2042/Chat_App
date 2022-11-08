import express from 'express'
import { ModifiedRouter } from '../interface';
import * as userController from '../Controller/userController'
import middleware from '../Middleware/middleware'

const userRoute:ModifiedRouter = express.Router()

userRoute.post('/register', userController.Register)

userRoute.post('/register/:passwordURL', userController.PasswordUrl)

userRoute.post('/login',middleware, userController.Login)

export default userRoute