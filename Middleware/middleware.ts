import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { ModifiedRequest } from '../interface';
import userModel from '../Model/userModel'

let envSecret = process.env.SECRET_KEY as string

const middleware = (req:ModifiedRequest, res:express.Response, next:express.NextFunction) =>{
    let token = req.headers['jwt-token'] as string
    console.log("tokebn: ", token)

    if(token && envSecret){
        let verifying = jwt.verify(token, envSecret)
        let decoding:any = jwt.decode(token)

        try {
            if(req.path !== '/register'  && req.path !== '/login' && !req.path.startsWith('/register')){
                userModel.findById({_id: new mongoose.Types.ObjectId(decoding._id)})
                .then((findResponse)=>{
                    if(findResponse){
                        req.users = findResponse
                        req.admins = findResponse
                        next()
                    }
                })
                .catch(err=>console.log(err))
            }
            else{
                console.log("Middleware error")
            }
        } catch (error) {
            return res.json({
                message:"Invalid token or token expired",
                auth:false,
                user:null
            })
        }
    }
    else{
        if(req.path === '/register' || req.path.startsWith('/register') || req.path === '/login'  ){
            next()
        }
        else{
            return res.json({
                message:"Invalid path",
                auth:false,
                user:null
            })
        }
    }
}

export default middleware