
import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import ChatInput from './ChatInput';


interface propType{
  selectedName?:string
  selectedImage?:string
  currentChat:any
}

const ChatContainer = ({selectedName,selectedImage, currentChat}:propType) => {



  // const handleSendMsg = (msg:any) =>{
  //   alert(msg)
   
  // }

  

  return (
    <>
    
    {/* <div className='container'  */}
    {/* style={{ */}
       {/* backgroundColor:"white" */}
    {/* }}> */}
      {/* <div className="chat-header" */}
      {/* style={{ */}
        
      {/* }}> */}
      {/* <div className="image "  */}
      {/* style={{ */}
       
      {/* }}> */}
        {/* { */}
          {/* selectedImage? */}
          {/* <> */}
          {/* <img src={selectedImage} alt="" */}
          {/* <img src={currentChat.image} alt=""
      style={{
        justifyItems:"center",
        alignItems:'center',
        marginLeft:"400px",
        marginTop:"-830px",
        width:'4rem',
        height:"4rem",
        maxInlineSize:"100%",
        borderRadius:"50%",
        display:'flex'
      }} /> */}
          {/* </> */}
          {/* : */}
          {/* <></> */}
        {/* } */}
{/*       
      </div>
      <div className="name">
      <h1 
      style={{
        color:"white",
        fontSize:"25px",
        justifyItems:"center",
        alignItems:'center',
        marginLeft:"480px",
        marginTop:"-50px"
        }}>
          {selectedName}</h1>
          
      </div> */}

      {/* </div> */}
      {/* handleSendMsg={handleSendMsg}  */}
      {/* { <ChatInput /> } */}
    {/* </div> */}
   
      <ChatInput selectedName={selectedName} selectedImage={selectedImage} currentChat={currentChat}/>
      </>
  )
}

export default ChatContainer
