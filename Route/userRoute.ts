import express from 'express'
import { ModifiedRouter } from '../interface';
import * as userController from '../Controller/userController'
import middleware from '../Middleware/middleware'
import { upload } from '../Controller/userController';

const userRoute:ModifiedRouter = express.Router()

userRoute.post('/register', userController.Register)

userRoute.post('/register/:passwordURL', userController.PasswordUrl)

userRoute.post('/login',middleware, userController.Login)

userRoute.get('/status', middleware, userController.Status)

userRoute.post('/profileupload', upload.single('image'), middleware, userController.ProfileUpload)

export default userRoute