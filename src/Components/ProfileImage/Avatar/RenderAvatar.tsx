import React,{useState} from "react";
import "./avatar.css";
import "../../../index.css"
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CameraAlt } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import RenderCropper from '../Cropper/RenderCropper'

const RenderAvatar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [showCropper, setShowCropper] = useState(false)

  const [avatar,setAvatar] = useState("")

  console.log("avatar: ", avatar)

  return (
    <>
      <div
        className="avatar-container"
        style={{
          width: "300px",
          height: "300px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="avatar"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: "#f5f5f5",
            overflow: "hidden",
          }}
        >
          <img
            src={avatar}
            alt="avatar"
            className="avatar-img"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>

      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          right: "100px",
          position: "absolute",
          bottom: "0",
          height: "3rem",
          width: "3rem",
          backgroundColor: "#f5f5f5",
          marginBottom: "220px",
          marginRight: "750px",
          
        }}
      >
        <CameraAlt fontSize="large"/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>View</MenuItem>
        <MenuItem onClick={()=>{
            setShowCropper(true)
            handleClose()
        }}>Change</MenuItem>
        <MenuItem onClick={handleClose}>Remove</MenuItem>
      </Menu>

        {
            showCropper &&  <RenderCropper setAvatar={setAvatar}/>
        }
     
    </>
  );
};

export default RenderAvatar;
