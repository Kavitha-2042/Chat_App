import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
import {  useParams, useNavigate } from 'react-router-dom';

const Password = () => {
    const params = useParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [conPassword, setConPassword] = useState("")


    const eventHandler = (e:any) =>{
        e.preventDefault()
        axios.post('/user/register/'+params.url, {password, conPassword})
        .then((passwordResponse)=>{
            if(passwordResponse.data.auth === true){
                toast.success(passwordResponse.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
                
                setTimeout(() => {
                  navigate('/profileimage')
                },5000);
            }
            else{
                toast.info(passwordResponse.data.message,{
                    position: toast.POSITION.TOP_CENTER
                })
            }
        })
        .catch((error)=>{
            toast.error("Error occured", {
                position:toast.POSITION.TOP_CENTER
            })
        })
    }

  return (
    <div>
        <div className="flex justify-center">
  <div className="block p-6 rounded-lg shadow-2xl bg-blue-100 max-w-lg  m-48">
    <h5 className="text-gray-900 leading-tight font-medium mb-2 text-center text-2xl">Register</h5>
    <div className='border rounded-lg'>
        <input type="password" name='Password' placeholder=' Password...' required className='rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start' 
        onChange={(e:any)=>{setPassword(e.target.value)}}/>
        <br />
        <input type="password" name='Confirm Password' placeholder='Confirm Password...' required className='rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start' 
        onChange={(e:any)=>{setConPassword(e.target.value)}}/>
    </div>

                <div className="text-center lg:text-left">
                  <button
                    onClick={eventHandler}
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Register
                  </button>
                 
                </div>
  </div>
</div>

    <ToastContainer/>
    </div>
  )
}

export default Password