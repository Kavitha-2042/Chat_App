import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppState } from '../Redux/Hooks';
import axios from 'axios';
import { initialize } from '../Redux/Slice/userSlice';
import { initializeAdmin } from '../Redux/Slice/adminSlice';


const Header = () => {

    const dispatch = useAppDispatch()
    
    const userAuth = useAppState((state)=>{
        return state.user.auth
    })

    const adminAuth = useAppState((state)=>{
        return state.admin.auth
    })

    useEffect(() => {
        axios.get('/user/status')
        .then((statusResponse)=>{
            if(statusResponse.data.role === "User"){
                dispatch(initialize({user:statusResponse.data.user, auth:statusResponse.data.auth}))
            }
            if(statusResponse.data.role === "Admin"){
                dispatch(initializeAdmin({admin:statusResponse.data.admin, auth:statusResponse.data.auth}))
            }
        })
        .catch(err=>console.log(err))
    }, [dispatch, adminAuth,userAuth])
    

  return (
    <div>
       <div className='flex justify-between bg-blue-500 p-4 text-white text-xl'>
        <Link to='/'>Home</Link>

        {
            userAuth?
            <div className='flex justify-between space-x-4'>
            <Link to='/profileimage'>ProfileImage</Link>
            <Link to='/profile</>' >Profile</Link>
            <Link to='/signout'>Signout</Link>
            </div>
            : 
            <div className='flex justify-between space-x-4'>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            </div>
        }
        {
            adminAuth?
            <div className='flex justify-between space-x-4'>
            <Link to='/signout'>Signout</Link>
            </div>
            :
            <>
            </>
        }
       </div>
    </div>
  )
}

export default Header
