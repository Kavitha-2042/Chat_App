import mongoose from "mongoose"

export const messageSchema = new mongoose.Schema({
  message:{
    text:{
        type:String,
        required:true
    }
  },
  users:{
    type:Array
  },
  sender:{
    // type:mongoose.Schema.Types.ObjectId
    type:String
  },
    time:{
        type:Date,
        default:Date.now()
    }
 
 
}
)

export default mongoose.model("Message_Details", messageSchema)