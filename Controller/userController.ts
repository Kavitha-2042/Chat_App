import express from "express"
import joi, { number } from "joi"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import { ModifiedRequest } from "../interface"
import userModel from "../Model/userModel"

export const Signup = (req:ModifiedRequest, res:express.Response) =>{
    const {name, password, conPassword, phoneNumber} = req.body

    const validation = joi.object({
        name:joi.string().required(),
        password:joi.string().min(8).max(20).uppercase().required(),
        conPassword:password,
        phoneNumber:joi.string().min(9).max(13).required()
    })

    validation.validateAsync({name, password, conPassword, phoneNumber})
    .then((validationResult)=>{
        userModel.findOne({name})
        .then((nameResponse:any)=>{
            if(nameResponse!== null && nameResponse.length > 0){
                return res.json({
                    message:"User already exist",
                    auth:false
                })
            }
            bcryptjs.hash(password,15) 
            .then((hashPassword)=>{
                userModel.create({name, password:hashPassword, phoneNumber})
                .then((createResponse)=>{
                    let token = jwt.sign({_id:createResponse._id}, process.env.USER_KEY as string)
                    return res.json({
                        message:"Signup successful",
                        token, 
                        user:createResponse,
                        auth:true
                    })
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}

export const Signin = (req:ModifiedRequest, res:express.Response) =>{
    const {name, password} = req.body;
    
    const validation = joi.object({
        name:joi.string().required(),
        password:joi.string().min(8).max(20).uppercase().required()
    })
    
    validation.validateAsync({name, password})
    .then((validationResult)=>{
        userModel.findOne({name})
        .then((nameResponse)=>{
            if(!nameResponse){
                return res.json({message:"User doesn't exist", auth:false})
            }
            bcryptjs.compare(password, nameResponse.password as string)
            .then((comparisonResult)=>{
                if(!comparisonResult){
                    return res.json({
                        message:"Incorrect password",
                        auth:false
                    })
                }
                let token = jwt.sign({_id:nameResponse._id}, process.env.ADMIN_KEY as string)
                return res.json({
                    message:"User signin successful!",
                    auth:true,
                    admin:nameResponse,
                    token
                })
            })
            .catch(err=>console.log(err))

    
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}