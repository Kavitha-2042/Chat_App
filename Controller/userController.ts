import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import joi from 'joi'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import multer from "multer"

import { ModifiedRequest } from '../interface'
import userModel from '../Model/userModel'
import urlModel from "../Model/urlModel"

function urlPattern(length:number){
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ""
    for(let i = 0; i < length; i++){
        result+=characters.charAt(Math.floor(Math.random()*characters.length-1))
    }
    return result
}

const transporter = nodemailer.createTransport({
    service:"sendinblue",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASSWORD
    }
})

export const Register = (req:ModifiedRequest, res:express.Response) =>{
    const {name, email, phoneNumber} = req.body

    const validation = joi.object({
        name:joi.string().required().alphanum(),
        email:joi.string().email().required(),
        phoneNumber:joi.string().required().min(9).max(13).required()
    })

    validation.validateAsync({name,email, phoneNumber})
    userModel.find({email, name})
    .then((emailResponse)=>{
        if(emailResponse.length > 0){
            return res.json({message:"User already exist"})
        }
        else{
            userModel.create({name,email,phoneNumber})
            .then((createResponse)=>{
                let token = jwt.sign({_id:createResponse._id}, process.env.SECRET_KEY as string)
                const url = urlPattern(20)
                const creationTime = Date.now()
                const expirationTime = creationTime+5*60*1000

                urlModel.create({url, email, creationTime, expirationTime})
                .then((urlResponse)=>{
                    const MailObject = transporter.sendMail({
                    from:process.env.AUTH_EMAIL,
                    to:email,
                    subject:"Group Chat_Password Link",
                    text:`http://localhost:3000/register/${urlResponse.url}`
                })
                .then((response)=>{
                    return res.json({
                        message:"Link sent",
                        redirection:null,
                        user:createResponse,
                        auth:true,
                        token
                    })
                })
                .catch((err)=>{
                    return res.json({
                        message:err
                    })
                })
            })
            .catch((err)=>{
                return res.json({
                    message:err
                })
            })

            })
            .catch((err)=>{
                return res.json({
                    message:err
                })
            })

        }
    })
    .catch((err)=>{
        return res.json({
            message:err
        })
    })
}

export const PasswordUrl = (req:ModifiedRequest, res:express.Response) =>{
    const url = req.params.passwordURL;

    urlModel.findOne({url:url})
    .then((urlResponse:any)=>{
        if(!urlResponse){
            return res.json({
                message:"Your Url is  not valid",
                auth:false
            })
        }
        if(urlResponse){
            let time=Date.now()
            if(time > urlResponse.expirationTime){
                urlModel.deleteOne({url})
                .then((deleteResponse)=>{
                    return res.json({
                        message:"Link expired",
                        auth:false
                    })
                })
                .catch((err)=>{
                    return res.json({
                        message:"Some error occured"
                    })
                })
            }
            else{
                const {password, conPassword} = req.body

                const validation = joi.object({
                    password:joi.string().min(8).max(20).uppercase().required(),
                    conPassword:password
                })

                validation.validateAsync({password, conPassword})
                .then((vaidateResponse:any)=>{
                    if(password === conPassword){
                        bcryptjs.hash(password,15)
                        .then((hashPassword)=>{
                            console.log("Hash password: ", hashPassword)
                            userModel.updateOne({email:urlResponse.email}, {password:hashPassword})
                            .then((updateResponse)=>{
                                console.log("update response: ", updateResponse)
                                
                                // let token = jwt.sign({_id:},process.env.SECRET_KEY as string)
                                return res.json({
                                    message: "Register successfull!",
                                    auth:true,
                                    user:updateResponse
                                })
                            })
                            .catch((err)=>{
                                return res.json({
                                    message:err
                                })
                            })
                        })
                        .catch((err)=>{
                            return res.json({
                                message:err
                            })
                        })
                    }
                    else{
                        return res.json({
                            message:"Password and confirm password are not same"
                        })
                    }
                })
                .catch((err)=>{
                    return res.json({
                        message:err
                    })
                })
            }
        }
    })
    .catch((err)=>{
        return res.json({
            message:err
        })
    })
}   

export const Login = (req:ModifiedRequest, res:express.Response) =>{
    const {name,password } = req.body

    const validation = joi.object({
        name:joi.string().required().alphanum(),
        password:joi.string().min(8).max(20).uppercase().required()
    })

    validation.validateAsync({name, password})
    .then((validationResult)=>{
        userModel.findOne({name})
        .then((nameResponse)=>{
            console.log("Name Response: ", nameResponse)
            if(!nameResponse){
                return res.json({
                    message:"User doesn't exist",auth:false,user:null
                })
            }
            console.log("Below the nt name response")
            if(nameResponse.role === 'Admin'){
                if(nameResponse.password === password){
                    let token = jwt.sign({_id:nameResponse._id}, process.env.SECRET_KEY as string)
                    console.log("Admin Token: ", token)
                    return res.json({
                        message:"Admin login successful",
                        auth:true,
                        admin:nameResponse,
                        token,
                        role:"Admin"
                    })
                }
                else{
                    return res.json({
                        message:"Incorrect passwrord",
                        auth:false
                    })
                }
            }
            console.log("below the admin")
                console.log("User")
                bcryptjs.compare(password, nameResponse.password)
                .then((comparedResult)=>{
                    if(!comparedResult){
                        return res.json({
                            message:"Incorrect password",
                            auth:false,
                            user:null
                        })
                    }
                    let token = jwt.sign({_id:nameResponse._id}, process.env.SECRET_KEY as string)
                    console.log("Token in login: ", token)
                    return res.json({
                        message:"Login successful",
                        auth:true,
                        user:nameResponse,
                        token,
                        role:"User"
                    })
                })
                .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}




// const fileStorageEngine = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null, "Public/images")
//     },
//     filename:(req,file,cb)=>{
//         cb(null, Date.now()+"_"+file.originalname)
//     }
// })

// export const upload = multer({storage:fileStorageEngine})

// export const ProfileUpload = (req:ModifiedRequest, res:express.Response) =>{
//     const {image} = req.body

//     let newItem = {
//         image: (req.file as Express.Multer.File).path,
//         email:req.users.email
//     }
// }