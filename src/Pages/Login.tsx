import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAppDispatch } from "../Redux/Hooks";
import { initializeAdmin } from "../Redux/Slice/adminSlice";
import { Link, useNavigate } from "react-router-dom";
import { initialize } from "../Redux/Slice/userSlice";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const eventHandler = (e: any) => {
    e.preventDefault();
    console.log("Clicked");

    if (name === "" || password === "") {
      toast.info("Name and Password is required", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 3000,
      });
    }
    axios
      .post("/user/login", { name, password })
      .then((LoginResponse) => {
        console.log(LoginResponse.data.role);
        if (name === "" || password === "") {
          toast.error("Name and Password is required", {
            position: toast.POSITION.TOP_CENTER,
            theme: "dark",
            autoClose: 3000,
          });
        }
        if (LoginResponse.data.role === "Admin") {
          if (LoginResponse.data.auth === true) {
            localStorage.setItem("jwt-token", LoginResponse.data.token);
            dispatch(
              initializeAdmin({
                admin: LoginResponse.data.admin,
                auth: LoginResponse.data.auth,
              })
            );
            toast.success(LoginResponse.data.message, {
              position: toast.POSITION.TOP_CENTER,
              theme: "dark",
              autoClose: 3000,
            });
            setTimeout(() => {
              navigate("/admin");
            }, 5000);
          } else {
            toast.error(LoginResponse.data.message, {
              position: toast.POSITION.TOP_CENTER,
              theme: "dark",
              autoClose: 3000,
            });
          }
        } 
        // else {
        //   toast.info(LoginResponse.data.message, {
        //     position: toast.POSITION.TOP_CENTER,
        //     theme: "dark",
        //     autoClose: 3000,
        //   });
        //   // alert("err")
        // }

        if (LoginResponse.data.role === "User") {
          if (LoginResponse.data.auth === true) {
            localStorage.setItem("jwt-token", LoginResponse.data.token);
            dispatch(
              initialize({
                user: LoginResponse.data.user,
                auth: LoginResponse.data.auth,
              })
            );
            toast.success(LoginResponse.data.message, {
              position: toast.POSITION.TOP_CENTER,
              theme: "dark",
              autoClose: 3000,
            });
            setTimeout(() => {
              navigate("/chat");
            }, 5000);
          } else {
            toast.error(LoginResponse.data.message, {
              position: toast.POSITION.TOP_CENTER,
              theme: "dark",
              autoClose: 3000,
            });
          }
        } 
        // else {
        //   toast.info(LoginResponse.data.message, {
        //     position: toast.POSITION.TOP_CENTER,
        //     theme: "dark",
        //     autoClose: 3000,
        //   });
        //   // alert("err")
        // }
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
          autoClose: 3000,
        });
      });
  };

  return (
    <div>
      <h1
        style={{
          color: "white",
          fontSize: "50px",
          marginLeft: "750px",
          marginTop: "150px",
          marginBottom: "-90px",
          fontFamily: "serif",
        }}
      >
        Welcome to Chat_App
      </h1>
      <form action="" style={{}}>
        <div className="flex justify-center" style={{}}>
          <div
            className="block p-6 rounded-lg shadow-2xl max-w-lg  m-48"
            style={{ backgroundColor: "#131355" }}
          >
            <h5 
            style={{
              fontFamily:"serif"
            }}
            className="text-white leading-tight font-medium mb-2 text-center text-2xl">
              Login
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
                placeholder=" Username..."
                required
                style={{
                  border: "0.1rem solid #4e0eff",
                  borderRadius: "0.4rem",
                  backgroundColor: "#131324",
                  color:"white",
                  
                }}
                className="rounded-md  ml-6 required p-1 m-2 border border-blue-700   text-start"
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder=" Password..."
                style={{
                  border: "0.1rem solid #4e0eff",
                  borderRadius: "0.4rem",
                  backgroundColor: "#131324",
                  color:"white"
                }}
                required
                className="rounded-md  ml-6 required p-1 m-2 border border-blue-700 text-start"
                onChange={(e: any) => {
                  setPassword(e.target.value);
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
                  className="form-check-label inline-block text-white"
                  htmlFor="exampleCheck2"
                >
                  Remember me
                </label>
              </div>
              {/* <a href="#!" className="text-gray-800">
                Forgot password?
              </a> */}
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
                  fontFamily:"serif"
                }}
                className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Login
              </button>
              <p 
              style={{
                
              }}
              className="text-sm font-semibold mt-2 pt-1 mb-0 text-white">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "#9e0efdff",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontFamily:"serif"
                  }}
                >
                  Create One
                </Link>
              </p>
            </div>
          </div>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
