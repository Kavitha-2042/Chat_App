import express from 'express'
import mongoose from 'mongoose'
import joi from 'joi'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

import { ModifiedRequest } from '../interface'
import adminModel from '../Model/adminModel'

export const AdminSignup = (req:ModifiedRequest, res:express.Response) =>{
    const { name, password } = req.body;

    const validation = joi.object({
        name:joi.string().required(),
        password:joi.string().min(8).max(20).uppercase().required()
    })

    validation.validateAsync({name,password})
    .then((validationResult)=>{
        adminModel.findOne({name})
        .then((nameResponse)=>{
            bcryptjs.hash(password,15)
            .then((hashPassword)=>{
                adminModel.create({name,password:hashPassword})
                .then((createResponse)=>{
                    let token = jwt.sign({_id:createResponse._id}, process.env.ADMIN_KEY as string)
                    return res.json({
                        message:"Signup successful",
                        token, 
                        admin:createResponse,
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

export const AdminSignin = (req:ModifiedRequest, res:express.Response) =>{
    const {name, password} = req.body;
    
    const validation = joi.object({
        name:joi.string().required(),
        password:joi.string().min(8).max(20).uppercase().required()
    })
    
    validation.validateAsync({name, password})
    .then((validationResult)=>{
        adminModel.findOne({name})
        .then((nameResponse)=>{
            if(!nameResponse){
                return res.json({message:"Admin doesn't exist", auth:false})
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
                    message:"Admin signin successful!",
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