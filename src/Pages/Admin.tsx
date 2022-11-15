import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allUserImage, setAllUserImage] = useState("");
  const [allUserName, setAllUserName] = useState("");
  const [btn, setBtn] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const eventHandler = (val: any) => {
    setBtn(true);
    setSelectedName(val.name);
    setSelectedImage(val.image);
    setSelectedId(val._id);
  };

  const handleClose = () => {
    axios
      .post("/user/deleteUser", { name: selectedName })
      .then((deleteResponse) => {
        if (deleteResponse) {
          toast.success(`${selectedName} removed`, {
            position: toast.POSITION.TOP_CENTER,
            theme: "dark",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/user/allUsers")
      .then((allResponse) => {
        console.log("All users: ", allResponse);
        if (allResponse) {
          if (true) {
            setAllUsers(allResponse.data.details);
            setAllUserImage(allResponse.data.details[0].image);
            setAllUserName(allResponse.data.details[0].name);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          fontSize: "50px",
          marginTop: "50px",
          marginBottom: "10px",
          fontFamily:"serif"
        }}
      >
        <Link to="/signout">Welcome Admin!</Link>
      </h1>

      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",

            //    backgroundColor:"#ffffff34",

            cursor: "pointer",

            borderRadius: "0.2rem",

            marginTop: "30px",
            height: "90px",
            gap: "1rem",
            transition: "0.5s ease-in-out",
            alignItems: "flex-start",
          }}
        >
          {allUsers.length > 0 ? (
            <>
              {allUsers.map((val: any) => {
                return (
                  <div
                    key={val._id}
                    onClick={() => eventHandler(val)}
                    style={{
                      backgroundColor: "#ffffff34",
                      paddingLeft: "10px",
                      width: "20%",
                    }}
                  >
                    <img
                      src={val.image}
                      alt=""
                      className="rounded-full"
                      style={{
                        height: "4rem",
                        width: "4rem",
                        margin: "10px",
                      }}
                    />

                    <h1
                      style={{
                        color: "white",
                        marginTop: "-55px",
                        marginLeft: "-40px",
                        fontSize: "20px",
                      }}
                    >
                      {val.name}
                    </h1>
                    <br />
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {btn ? (
        <>
          <Button
            onClick={handleClose}
            style={{
              color: "white",
              alignItems: "center",
              marginLeft: "800px",
              fontSize: "30px",
              backgroundColor: "darkslateblue",
              fontFamily:"initial"
            }}
          >
            Remove {selectedName}
          </Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Admin;
