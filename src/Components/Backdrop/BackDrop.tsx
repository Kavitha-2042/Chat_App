// import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
// import Button from '@mui/material/Button';

// export const BackDropContent = React.createContext()

// const BackDrop = () => {
//   const [open, setOpen] = React.useState(false);
  
//   const closeBackDrop = () => {
//     setOpen(false);
//   };
//   const showBackdrop = () => {
//     setOpen(!open);
//   };

//   return (
//     <BackDropContent.Provider value={{closeBackDrop, showBackdrop}}>
      
//       <Backdrop
//         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={open}
//         onClick={closeBackDrop}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </BackDropContent.Provider>
//   );
// }

// export default BackDrop

import React from 'react'

const BackDrop = () => {
  return (
    <div>BackDrop</div>
  )
}

export default BackDrop