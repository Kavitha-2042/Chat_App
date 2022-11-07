import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import adminRoute from './Route/adminRoute'
import userRoute from './Route/userRoute'

const app:express.Application = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/admin', adminRoute)
app.use('/user', userRoute)

mongoose.connect(process.env.MONGOOSE_URL as string, ()=>{
    console.log("Db connected")
    app.listen(process.env.PORT_NUMBER as string, ()=>{
        console.log(`Server runs on port ${process.env.PORT_NUMBER}`)
    })
})