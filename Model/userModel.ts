import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
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
        type:Number
    },
    email:{
        type:String
    },
    role:{
        type:String,
        default:"User"
    },
    image:{
        type:String,
        default:''
    }
})

export default mongoose.model("User_Details", userSchema)