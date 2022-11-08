import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Password from './Pages/Password';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import ProfileImage from './Pages/ProfileImage';

function App() {
  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/register/:url' element={<Password/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/profileimage' element={<ProfileImage/>} />
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
