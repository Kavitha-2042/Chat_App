// import React,{useState,useEffect} from 'react'
// import Avatar from 'react-avatar-edit'

// const ProfileImage = () => {

//   const [srcImage, setSrcImage] = useState("")
//   const [preview, setPreview] = useState('')

//   const onClose = ()=>{
//     setPreview("")
//   }

//   const onCrop = (view:any) =>{
//     setPreview(view)
//   }

//   useEffect(() => {

//   }, [preview])

//   return (
//     <div>
//         <Avatar
//          width={400}
//          height={300}
//          onCrop={onCrop}
//         onClose={onClose}
//         src={srcImage}
//         />
//         {preview && <img src={preview} alt="" />}

//     </div>
//   )
// }

// export default ProfileImage

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
        marginTop:"100px",
        fontSize:"50px",
        marginBottom:"-10px",
        fontFamily:"serif"
      }}>
        <Link to='/chat'>
      Set your Profile Image!
      </Link>
      </h1>
     <RenderAvatar />
    </div>
  );
};

export default ProfileImage;
