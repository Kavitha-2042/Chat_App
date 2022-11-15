import express from 'express'
import { ModifiedRouter } from '../interface';
import * as userController from '../Controller/userController'
import middleware from '../Middleware/middleware'
import { upload } from '../Controller/userController';

const userRoute:ModifiedRouter = express.Router()

userRoute.post('/register', userController.Register)

userRoute.post('/register/:passwordURL', userController.PasswordUrl)

userRoute.post('/login', userController.Login)

userRoute.get('/status', middleware, userController.Status)

userRoute.post('/profileupload', upload.single('image'), middleware, userController.ProfileUpload)

userRoute.get('/currentUser', middleware, userController.CurrentUser)

userRoute.get('/allUsers',middleware, userController.AllUsers)

userRoute.post('/deleteUser', userController.deleteUser)

export default userRoute