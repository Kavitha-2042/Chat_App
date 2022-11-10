import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import Welcome from "./Welcome";
import Chat from "../../Pages/Chat";

// {changeChat}:any
const Contacts = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const [allUserName, setAllUserName] = useState(undefined);
  const [allUserImage, setAllUserImage] = useState(undefined);

    const [btn,setBtn] = useState(false)

   

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
          } else {
            navigate("/profileimage");
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

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

  console.log("current user name: ", currentUserName);
  console.log("current user image: ", currentUserImage);
  console.log("all users: ", allUsers);
  console.log("all user name: ", allUserName);
  console.log("all user image: ", allUserImage);

//   const changeCurrentChat = (index: any, allUsers: []) => {
//     setCurrentSelected(index)
//     changeChat(allUsers)
//   };
    

const eventHandler = (e:any) =>{
    e.preventDefault()
    setBtn(true)
    console.log("Button clikced")
    // navigate('/')

}
    
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
                  <h3>{currentUserName}</h3>
                  <br />
                </div>

                <p
                  style={{
                    fontSize: "15px",
                    marginTop: "-5px",
                    paddingLeft: "100px",
                    color: "white",
                  }}
                >
                  User
                </p>
              </div>
            </div>

            <div
            
              style={
                {
                  //  backgroundColor:"#ffffff34",
                }
              }
            >
              <div
              
                className="allusers "
                
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
                          onClick={eventHandler}
                          style={{
                            backgroundColor: "#ffffff34",
                            paddingLeft:"10px",
                            
                            
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
                              marginLeft: "-110px",
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
      
    </div>
  );
};

export default Contacts;
