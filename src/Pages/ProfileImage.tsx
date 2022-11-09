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
import RenderAvatar from '../Components/Avatar/RenderAvatar';



const ProfileImage = () => {

  return (
    <div>
     <RenderAvatar />
    </div>
  );
};

export default ProfileImage;
