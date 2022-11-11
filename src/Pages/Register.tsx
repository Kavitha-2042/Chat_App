import React, {useState} from "react";
import axios from 'axios';
import { useAppDispatch } from '../Redux/Hooks';
import { initialize } from "../Redux/Slice/userSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {

    const dispatch = useAppDispatch()

    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")  

  const eventHandler = (e: any) => {
    e.preventDefault();
    console.log("Started")
    axios.post('/user/register', {name,email,phoneNumber})
    .then((registerResponse)=>{
        console.log("register response: ", registerResponse)
        if(registerResponse){
            console.log("if works")
            toast.success(registerResponse.data.message,{
                position:toast.POSITION.TOP_CENTER
            })
        }
        else{
            toast.error("error",{
                position: toast.POSITION.TOP_CENTER
            })
        }
        console.log("out of if")
    })
    .catch(err=>console.log(err))
  }

  return (
    <div>
      <div className="flex justify-center">
  <div className="block p-6 rounded-lg shadow-2xl bg-blue-100 max-w-lg  m-48">
    <h5 className="text-gray-900 leading-tight font-medium mb-2 text-center text-2xl">Register</h5>
    <div className='border rounded-lg'>
        <input type="text" name='username' placeholder=' username...' required className='rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start' 
        onChange={(e:any)=>{setName(e.target.value)}}/>
        <br />
        <input type="email" name='email' placeholder=' email...' required className='rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start' 
        onChange={(e:any)=>{setEmail(e.target.value)}}/>
        <br />
        <input type="number" name='phoneNumber' placeholder='phoneNumber' required className='rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start' 
        onChange={(e:any)=>{setPhoneNumber(e.target.value)}}/>
    </div>
    <br />
        <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600  checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800 mr-10"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                 
                </div>

                <div className="text-center lg:text-left">
                  <button
                    onClick={eventHandler}
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Register
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Have an account?
                    <a
                      href="/"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                       Login
                    </a>
                  </p>
                </div>
  </div>
</div>

    <ToastContainer/>
    </div>
  );
};

export default Register;
