import mongoose from "mongoose";

export const urlSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    creationTime:{
        type:String,
        required:true
    },
    expirationTime:{
        type:String,
        required:true
    }
})

export default mongoose.model("Url_Details", urlSchema)