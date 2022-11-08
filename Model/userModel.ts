import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        default:''
    },
    conPassword:{
        type:String
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"User",
        required:true
    }
})

export default mongoose.model("User_Details", userSchema)