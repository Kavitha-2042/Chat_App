import mongoose from "mongoose";

export const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export default mongoose.model("Admin_Details", adminSchema)
