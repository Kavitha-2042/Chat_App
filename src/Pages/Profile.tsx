import React  from 'react'
import ProfileImage from './ProfileImage';


const Profile = () => {

  

  return (
    <div>
        <h1 style={{
          color:"white",
          fontSize:"40px",
          marginTop:"100px",
          display:"flex",
          justifyItems:"center",
          alignItems:"center",
          paddingLeft:"700px"
        }}>Change Your Profile Image here!</h1>
        <p style={{
          color:"white",
          fontSize:"20px",
          marginLeft:"800px", 
          marginTop:"10px"
        }}>Click to icon to show options!!!</p>
       
        <ProfileImage />
    </div>
  )
}

export default Profile