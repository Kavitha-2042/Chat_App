import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Contacts from '../Components/Chat/Contacts';
import Welcome from '../Components/Chat/Welcome';
import ChatContainer from '../Components/Chat/ChatContainer';
import { Logout } from '@mui/icons-material';



const Chat = () => {
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState("")
  const [allUsers, setAllUsers] = useState([])

  const [btn, setBtn] = useState(false)


  const [currentChat,setCurrentChat] = useState(undefined)

  useEffect(()=>{
    if(!localStorage.getItem('jwt-token')){
      navigate('/') 
    }
   
  },[])

  useEffect(()=>{
    axios.get('/user/currentUser')
    .then((currentUserResponse)=>{ 
      console.log("current user Details: ", currentUserResponse.data.details)
      if(currentUserResponse.data.auth === true){
        if(currentUserResponse.data.image){
          setCurrentUser(currentUserResponse.data.details)
        }
        // else{
        //   navigate('/profileimage')
        // }
      }
    })
    .catch(err=>console.log(err))
  },[currentUser])

  useEffect(()=>{
    axios.get("/user/allUsers")
    .then((allResponse)=>{
      console.log("All users: ", allResponse)
      if(allResponse){
        setAllUsers(allResponse.data.details)
      }
    })
    .catch(err=>console.log(err))
  },[])

  const handleChatChange = (chat:any) =>{
    setCurrentChat(chat)
  }

  console.log("current user check: ", currentUser)

  return (
    <div>
      <div className='Container' 
      style={{
        height:'100vh',
        width:'100vw',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        gap:'1rem',
        alignItems:'center',
        backgroundColor:'#131324'
      }}>
      <div className="container" 
      style={{
        height:'85vh',
        width:'85vw',
        backgroundColor:'#00000076',
        display:'grid',
        gridTemplateColumns:'25% 75%'
      }}>

      

{/* changeChat={handleChatChange} */}
      <Contacts setbtn={setBtn} btn={btn} currentChat={currentChat}   />
      {
        btn?
        <>
        <ChatContainer currentChat={currentChat} btn={false}  />
        </>
        :
        <>
          <Welcome/>
        </>
      }

      {/* {
        currentChat === undefined?
        <><Welcome /></>
        :
        <>
        <ChatContainer currentChat={currentChat} />
        </>
      }
    */}
      
      </div>
      </div>
     
    </div>
  )
}

export default Chat
