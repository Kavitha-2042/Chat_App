import express from "express"

import { ModifiedRouter } from "../interface"
import * as adminController from '../Controller/adminController'

const adminRoute:ModifiedRouter = express.Router()

adminRoute.post('/signup', adminController.AdminSignup)

adminRoute.post('/signin', adminController.AdminSignin)

export default adminRoute