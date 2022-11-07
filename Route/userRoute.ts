import express from "express"

import { ModifiedRouter } from "../interface"
import * as userController from '../Controller/userController'

const userRoute:ModifiedRouter = express.Router()

userRoute.post('/signup', userController.Signup)

userRoute.post('/signin', userController.Signin)

export default userRoute