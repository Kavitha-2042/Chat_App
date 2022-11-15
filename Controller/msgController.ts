
import express from "express"
import { valid } from "joi"
import messageModel from "../Model/messageModel"

export const createMsgs = (req:express.Request, res:express.Response) =>{
    try {

    const {from, to, message} = req.body

    messageModel.create({message:{text:message}, users:[from,to], sender:from})
    .then((createResponse)=>{
        return res.json({
            message:"Message sent successfully"
        })
    })
    .catch(err=>console.log(err))

    } catch (error) {
        console.log(error)
    }
}

export const getAllMsgs = (req:express.Request, res:express.Response)=>{
    const {from, to} = req.body

    messageModel.find({users:{$all:[from,to]}}).sort({time:1})
    .then((allResponse)=>{
        return res.json({
            value:"All the messages are sent",
            details:allResponse,
            allMessages: allResponse.map((val)=>val.message?.text),
            auth:true,
            length:allResponse.length,
            sender:allResponse.map((send)=>send.sender)
          

        })
    })
    //     allResponse.map((msg)=>{
    //        if(msg.sender===from){
    //         return res.json({
    //             message:"Only messages",
    //             vale:msg.message?.text
    //         })
    //        }
    //     })
    // })

        
    .catch(err=>console.log(err))
}

