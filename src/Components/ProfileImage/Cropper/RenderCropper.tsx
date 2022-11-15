import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Cropper from "react-easy-crop";
import { Slider } from "@mui/material";
import "/home/metadiac/Documents/Group_Chat/client/src/App.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { dataURLtoFile } from "../../../Utils/dataUrlToFile";

const RenderCropper = ({ setAvatar }: any) => {
  //const inputRef = React.useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerFileSelectPopup = () => inputRef.current?.click();

  const [image, setImage] = useState<any | null>(null);
  const [croppedArea, setCropppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<any | null>(1);

  const onCropComplete = (
    croppedAreaPercentage: any,
    croppedAreaPixels: any
  ) => {
    setCropppedArea(croppedAreaPixels);
    console.log(croppedAreaPercentage, croppedAreaPixels);
  };

  const onSelectFile = (e: any) => {
    // console.log(e)==> see in target->files->file
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader(); //for the use of reading the file asynchronously
      reader.readAsDataURL(e.target.files[0]); //read the file in data url
      reader.addEventListener("load", () => {
        // console.log(reader.result)
        setImage(reader.result);
      });
    }
  };

  // console.log("image: ", image)

  const onClear = () => {
    if (!image) {
      toast.warn("Please select an image", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 3000,
      });
    }
    setImage(null);
  };

  const onUpload = () => {
    if (!image) {
      toast.warn("Please select an image", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 3000,
      });
    }

    const convertedUrlToFile = dataURLtoFile(image, "cropped-image.jpeg");

    console.log("Url:", convertedUrlToFile);

    const formData = new FormData();
    formData.append("image", convertedUrlToFile);

    console.log("formdata: ", formData);

    axios
      .post("/user/profileupload", formData)
      .then((profileResponse) => {
        console.log("Outside: ", profileResponse.data.file);
        if (profileResponse) {
          console.log("profile response: ", profileResponse);
          setAvatar(profileResponse.data.file);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container  ">
        {/* <IconButton  style={{position:"absolute", top:"70px",right:"30px"}}>
            <Cancel className='hover:bg-red-700' style={{ color:"red",fontSize:"30px" }}  />
            </IconButton> */}
        <div
          className="conatiner-cropper"
          style={{ height: "90%", width: "100vw" }}
        >
          {image ? (
            <>
              <div className="cropper">
                <Cropper
                  image={image || undefined}
                  crop={crop}
                  zoom={zoom}
                  aspect={1} //for size
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="slider">
                <Slider
                  min={1}
                  max={3} //maximum of 3 zoom
                  step={0.1} //moving the slider by 0.1
                  value={zoom}
                  onChange={(e, zoom) => {
                    setZoom(zoom);
                  }}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div
          className="container-buttons"
          style={{
            height: "10%",
            border: "1px solid #f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            marginTop: "-150px",
          }}
        >
          <input
            type="file"
            accept="images/*"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={onSelectFile} //whenever we select a file,we want onSelectFile to run
          />

          <Button
            variant="contained"
            color="error"
            style={{ marginRight: "10px", marginLeft: "50px" }}
            onClick={onClear}
          >
            Clear
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={triggerFileSelectPopup}
          >
            Choose
          </Button>

          {/* <Button variant="contained" color="secondary"
          onClick={onDownload}
          >
            Download
          </Button> */}

          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "10px" }}
            onClick={onUpload}
          >
            Upload
          </Button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RenderCropper;
