import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Password from './Pages/Password';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import ProfileImage from './Pages/ProfileImage';
// import Header from './Components/Header';
import Signout from './Pages/Signout';
import Chat from './Pages/Chat';


function App() {
  return (
   <div>
    <BrowserRouter>
    {/* <Header/> */}
      <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path='/register' element={<Register/>} />
        <Route path='/register/:url' element={<Password/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/profileimage' element={<ProfileImage/>} />
        <Route path='/signout' element={<Signout/>} />
        <Route path='/chat' element={<Chat/>} />
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
