

import React from "react";
import { Link } from "react-router-dom";
import RenderAvatar from '../Components/ProfileImage/Avatar/RenderAvatar';



const ProfileImage = () => {

  return (
    <div>
      <h1 style={{
        color:"white",
        display:"flex",
        justifyItems:"center",
        marginLeft:"700px",
        marginTop:"80px",
        fontSize:"50px",
        marginBottom:"-10px",
        fontFamily:"serif"
      }}>
        <Link to='/chat'>
      Set your Profile Image!
      </Link>
      </h1>
      <p style={{
         color:"white",
         fontSize:"20px",
         marginLeft:"800px", 
         marginTop:"10px"
      }}>Click the icon to show options!!!</p>
     <RenderAvatar />
    </div>
  );
};

export default ProfileImage;
