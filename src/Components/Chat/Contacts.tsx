import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";

import { Logout } from "@mui/icons-material";
import ChatContainer from "./ChatContainer";
import Signout from "../../Pages/Signout";
import ChatInput from "./ChatInput";
import Welcome from "./Welcome";

interface propType {
  setbtn: React.Dispatch<React.SetStateAction<boolean>>;
  btn: boolean;
  currentChat: any;
}

// {changeChat}:any
const Contacts = ({ setbtn, btn, currentChat }: propType) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState("");
  const [currentUserID, setCurrentUserID] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  const [allUserName, setAllUserName] = useState("");
  const [allUserImage, setAllUserImage] = useState("");

  const [selectedName, setSelectedName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("jwt-token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios
      .get("/user/currentUser")
      .then((currentUserResponse) => {
        console.log("current user Details: ", currentUserResponse.data.details);
        if (currentUserResponse.data.auth === true) {
          if (currentUserResponse.data.details[0].image) {
            setCurrentUser(currentUserResponse.data.details);
            setCurrentUserName(currentUserResponse.data.details[0].name);
            setCurrentUserImage(currentUserResponse.data.details[0].image);
            setCurrentUserID(currentUserResponse.data.details[0]._id);
          } else {
            navigate("/profileimage");
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  localStorage.setItem("CurrentUserName", currentUserName);
  localStorage.setItem("CurrentUserId", currentUserID);

  console.log("INcontacts Name: ", currentUserName);

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

  // console.log("current user name: ", currentUserName);
  // console.log("current user image: ", currentUserImage);
  // console.log("all users: ", allUsers);
  // console.log("all user name: ", allUserName);
  // console.log("all user image: ", allUserImage);

  // const changeCurrentChat = (index:any, allUsers:any) => {
  //   setCurrentSelected(index)
  //   changeChat(allUsers)
  // };

  const eventHandler = (val: any) => {
    setbtn(true);
    console.log("Button clikced");
    setSelectedName(val.name);
    setSelectedImage(val.image);
    setClicked(true);
    setSelectedId(val._id);

    // navigate('/login')
    console.log("_id: ", val._id);
    console.log("My id: ", currentUserID);
    localStorage.setItem("SelectedId", val._id);
    localStorage.setItem("SelectedName", val.name);
  };

  console.log("SElected name in contacts: ", selectedName);

  return (
    <div>
      {currentUserName && currentUserImage ? (
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateRows: "10% 75% 15%",
            overflow: "hidden",
            backgroundColor: "#080420",
            // backgroundColor:"#0d0d30",
          }}
        >
          <div
            className="brand font-extrabold"
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "1rem",
              textTransform: "uppercase",
              padding: "20px",
              fontSize: "20px",
              fontFamily: "cursive",
            }}
          >
            <Logo />

            <div
              style={{
                color: "white",
                fontSize: "50px",
                display: "flex",
                justifyItems: "flex-end",
                alignItems: "flex-end",
              }}
            ></div>
          </div>

          <div
            style={{
              backgroundColor: "#0d0d30",
              width: "25%",
              height: "900px",
            }}
          >
            <div
              className="currentUser justify-evenly"
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                gap: "2rem",
                width: "460px",
                // height:"100px"
              }}
            >
              <div className="profileimage">
                <img
                  src={currentUserImage}
                  alt=""
                  style={{
                    width: "60px",
                    height: "4rem",
                    maxInlineSize: "100%,",
                    borderRadius: "500px",
                    display: "flex",
                    paddingTop: "-50px",
                    margin: "20px",
                    marginLeft: "10px",
                  }}
                />
                <div>
                  <div
                    className="currentusername"
                    style={{
                      color: "white",
                      justifyContent: "flex",
                      display: "flex",
                      alignItems: "baseline",
                      justifyItems: "baseline",
                      gap: "10px",
                      marginLeft: "90px",
                      marginTop: "-70px",
                      fontSize: "30px",
                      fontFamily: "initial",
                    }}
                  >
                    {<Link to="/profile">{currentUserName}</Link>}
                    <br />
                  </div>

                  <Link
                    to="/profile"
                    style={{
                      fontSize: "15px",
                      marginTop: "-5px",
                      paddingLeft: "100px",
                      color: "white",
                    }}
                  >
                    User
                  </Link>
                </div>
              </div>
            </div>
            <div
              className=" scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 h-4/6 overflow-y-scroll"
              style={
                {
                  //  backgroundColor:"#ffffff34",
                }
              }
            >
              <div
                className="allusers"
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
                }}
              >
                {allUsers.length > 0 ? (
                  <>
                    {allUsers.map((val: any) => {
                      return (
                        <div
                          className=""
                          key={val._id}
                          onClick={() => eventHandler(val)}
                          style={{
                            backgroundColor: "#ffffff34",
                            paddingLeft: "10px",
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
          </div>
        </div>
      ) : (
        <></>
      )}

      {btn ? (
        <>
          <div>
            <img
              src={selectedImage}
              alt=""
              style={{
                width: "60px",
                height: "4rem",
                maxInlineSize: "100%,",
                borderRadius: "500px",
                display: "flex",
                paddingTop: "-50px",
                margin: "20px",
                marginLeft: "400px",
                marginTop: "-830px",
              }}
            />
            <h1
              style={{
                color: "white",
                justifyContent: "flex",
                display: "flex",
                alignItems: "baseline",
                justifyItems: "baseline",
                gap: "10px",
                marginLeft: "470px",
                marginTop: "-70px",
                fontSize: "30px",
                fontFamily: "initial",
              }}
            >
              {selectedName}
            </h1>

            <ChatContainer
              btn={btn}
              currentUserID={currentUserID}
              currentUserName={currentUserName}
              currentUserImage={currentUserImage}
              selectedId={selectedId}
              selectedImage={selectedImage}
              selectedName={selectedName}
              currentChat={undefined}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Contacts;
