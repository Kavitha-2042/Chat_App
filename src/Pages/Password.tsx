import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Password = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const eventHandler = (e: any) => {
    e.preventDefault();

    if (password !== conPassword) {
      toast.warn("Password and confirm password must be same", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 3000,
      });
    } else if (password === "" || conPassword === "") {
      toast.warn("All the fields are required", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 3000,
      });
    }

    axios
      .post("/user/register/" + params.url, { password, conPassword })
      .then((passwordResponse) => {
        if (passwordResponse) {
          toast.success(passwordResponse.data.message, {
            position: toast.POSITION.TOP_CENTER,
            theme: "dark",
            autoClose: 3000,
          });

          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          toast.info("ERROR", {
            position: toast.POSITION.TOP_CENTER,
            theme: "dark",
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error("Error occured", {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
          autoClose: 3000,
        });
      });
  };

  return (
    <div>
      <div className="flex justify-center">
        <div
          style={{
            backgroundColor: "#131355",
          }}
          className="block p-6 rounded-lg shadow-2xl max-w-lg  m-48"
        >
          <h5 
          style={{
            fontFamily:"serif"
          }}
          className="text-white leading-tight font-medium mb-2 text-center text-2xl">
            Register
          </h5>
          <div
            style={{
              backgroundColor: "transparent",
              padding: "1rem",
            }}
            className=""
          >
            <input
              type="password"
              name="Password"
              placeholder=" Password..."
              required
              style={{
                border: "0.1rem solid #4e0eff",
                borderRadius: "0.4rem",
                backgroundColor: "#131324",
                color:"white"
              }}
              className="rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <input
              type="password"
              name="Confirm Password"
              placeholder="Confirm Password..."
              required
              style={{
                border: "0.1rem solid #4e0eff",
                borderRadius: "0.4rem",
                backgroundColor: "#131324",
                color:"white"
              }}
              className="rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start"
              onChange={(e: any) => {
                setConPassword(e.target.value);
              }}
            />
          </div>

          <div className="text-center lg:text-left">
            <button
              onClick={eventHandler}
              type="button"
              style={{
                backgroundColor: "#4e0eff",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "70px",
              }}
              className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Password;
