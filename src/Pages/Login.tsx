import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
import { useAppDispatch } from '../Redux/Hooks';
import { initializeAdmin } from '../Redux/Slice/adminSlice';
import { useNavigate } from 'react-router-dom';
import { initialize } from '../Redux/Slice/userSlice';



const Login = () => {

    const [ name,setName] = useState("")
    const [ password, setPassword] = useState("")

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const eventHandler = (e:any) =>{
        e.preventDefault()
        console.log("Clicked")

        axios.post('/user/login',{name, password})
        .then((LoginResponse)=>{
          console.log(LoginResponse.data.role)
            if(LoginResponse.data.role === "Admin"){
                if(LoginResponse.data.auth === true){
                localStorage.setItem('jwt-token', LoginResponse.data.token)
                dispatch(initializeAdmin({admin:LoginResponse.data.admin, auth:LoginResponse.data.auth}))
                toast.success(LoginResponse.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
               setTimeout(() => {
                navigate('/')
               }, 5000);
                
                }else{
                  toast.error(LoginResponse.data.message, {
                     position:toast.POSITION.TOP_CENTER
                  })
              }
            }
            
            if(LoginResponse.data.role === "User"){
              if(LoginResponse.data.auth === true){
                localStorage.setItem("jwt-token", LoginResponse.data.token)
                dispatch(initialize({user:LoginResponse.data.user, auth:LoginResponse.data.auth}))
                toast.success(LoginResponse.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
                setTimeout(() => {
                  navigate('/profile')
                }, 5000);
                
              }else{
                toast.error(LoginResponse.data.message, {
                    position:toast.POSITION.TOP_CENTER
                })
            }
              }
                
        })
        .catch((err)=>{
            toast.error(err, {
                position:toast.POSITION.TOP_CENTER
            })
        })
    }

  return (
    <div>
        <div className="flex justify-center">
  <div className="block p-6 rounded-lg shadow-2xl bg-blue-100 max-w-lg  m-48">
    <h5 className="text-gray-900 leading-tight font-medium mb-2 text-center text-2xl">Login</h5>
    <div className='border rounded-lg'>
        <input type="text" name='username' placeholder=' Username...' required className='rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start' 
        onChange={(e:any)=>{setName(e.target.value)}}/>
        <br />
        <input type="password" name='password' placeholder=' Password...' required className='rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start' 
        onChange={(e:any)=>{setPassword(e.target.value)}}/>
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
                  <a href="#!" className="text-gray-800">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    onClick={eventHandler}
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <a
                      href="/register"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Register
                    </a>
                  </p>
                </div>
  </div>
</div>

    <ToastContainer/>
    </div>
  )
}

export default Login