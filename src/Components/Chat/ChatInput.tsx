import { Logout, Send } from '@mui/icons-material'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'

interface propTypes {
//   handleSendMsg:any
currentChat:any
selectedName?:string|undefined
selectedImage?:string|undefined
}
// {handleSendMsg}:propTypes

const ChatInput = ({currentChat, selectedImage, selectedName}:propTypes) => {

  const [msg, setMsg] = useState("")

  const sendChat = (event:any) =>{
    event.preventDefault()
    if(msg.length > 0){
      console.log("msg: ", msg)
      // handleSendMsg(msg)
      setMsg("")
    }
  } 

  return (
    <>
    {/* <div className='hover:to-white shadow-slate-50'
     style={{
        marginLeft:"1300px",
 color:"white",
 
 cursor:"pointer"
          }}>
        <Link to='/signout'><Logout/></Link>
       
        
          </div> */}
      {/* <h1 style={{color:"white"}}>Chat input1</h1> */}
      <div className="chat-messages"
      style={{
        
      }}>
        
     <form action="" onSubmit={(event)=>sendChat(event)}>
     
      <input type="message" name='Type a message'placeholder='Type a message... ' onChange={(e)=>{setMsg(e.target.value)}} value={msg}
      style={{
        // marginBottom:"-70px",
        marginTop:"830px",
        marginLeft:"10px",
        width:"70%", 
        borderRadius:"3rem",
        height:"50px",
        backgroundColor:"#ffffff34",
        color:"white",
        paddingLeft:"1rem",
        fontSize:"1.2rem"
        
      }} />
      <button 
      className='shadow-slate-100 hover:to-white-900'
      style={{
        position:"relative",
        marginLeft:"-50px",
        backgroundColor:"#9a86f3",
        color:"white",
        // padding:"0.3rem 2rem",
        borderRadius:"35%",
       alignItems:"center",
       border:"none",
       height:"51px",
       width:"50px",
       marginBottom:"-20px",
       marginTop:"-10px"
        }}>
        <Send/></button>
     </form>
     
     </div>
    </>
  )
}

export default ChatInput
