import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    conPassword:{
        type:String
    },
    phoneNumber:{
        type:Number,
        required:true
    }
})

export default mongoose.model("User_Details", userSchema)