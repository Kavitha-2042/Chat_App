import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const eventHandler = (e: any) => {
    e.preventDefault();
    console.log("Started");

    if (name === "" || email === "" || phoneNumber === "") {
      toast.info("All fields are required", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 3000,
      });
    }

    axios
      .post("/user/register", { name, email, phoneNumber })
      .then((registerResponse) => {
        console.log("register response: ", registerResponse);
        if (registerResponse) {
          console.log("if works");
          toast.success(registerResponse.data.message, {
            position: toast.POSITION.TOP_CENTER,
            theme: "dark",
            autoClose: 3000,
          });
        } else {
          toast.error("error", {
            position: toast.POSITION.TOP_CENTER,
            theme: "dark",
            autoClose: 3000,
          });
        }
        console.log("out of if");
      })
      .catch((err) => console.log(err));
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
              fontFamily: "serif",
            }}
            className="text-white leading-tight font-medium mb-2 text-center text-2xl"
          >
            Register
          </h5>
          <div
            className=""
            style={{
              backgroundColor: "transparent",
              padding: "1rem",
            }}
          >
            <input
              type="text"
              name="username"
              placeholder=" username..."
              required
              style={{
                border: "0.1rem solid #4e0eff",
                borderRadius: "0.4rem",
                backgroundColor: "#131324",
                color: "white",
              }}
              className="rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start"
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder=" email..."
              required
              style={{
                border: "0.1rem solid #4e0eff",
                borderRadius: "0.4rem",
                backgroundColor: "#131324",
                color: "white",
              }}
              className="rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start"
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <input
              type="number"
              name="phoneNumber"
              placeholder="phoneNumber"
              required
              style={{
                border: "0.1rem solid #4e0eff",
                borderRadius: "0.4rem",
                backgroundColor: "#131324",
                color: "white",
              }}
              className="rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start"
              onChange={(e: any) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <br />
          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600  checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck2"
              />
              <label
                className="form-check-label inline-block text-white mr-10"
                htmlFor="exampleCheck2"
              >
                Remember me
              </label>
            </div>
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
            <p className="text-sm font-semibold mt-2 pt-1 mb-0 text-white">
              Already have an account?{"  "}
              <Link
                to="/"
                style={{
                  color: "#9e0efdff",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontFamily: "serif",
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
