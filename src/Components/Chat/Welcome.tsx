import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Logout } from "@mui/icons-material";

const Welcome = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("/user/currentUser")
      .then((currentUserResponse) => {
        if (currentUserResponse.data.auth === true) {
          setName(currentUserResponse.data.details[0].name);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <h1
        style={{
          color: "white",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          fontSize: "50px",
          paddingLeft: "290px",
          paddingTop: "20%",
        }}
      >
        {" "}
        Welcome, {name}!{" "}
      </h1>

      <br />
      <h3
        style={{
          color: "white",
          fontSize: "30px",
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          paddingLeft: "190px",
        }}
      >
        Please select a chat to Start Messaging!!!
      </h3>
    </div>
  );
};

export default Welcome;
