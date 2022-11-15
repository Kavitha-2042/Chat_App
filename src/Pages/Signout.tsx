import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 5000);
    toast.success("Thank you!", {
      position: toast.POSITION.TOP_CENTER,
      theme: "dark",
      autoClose: 3000,
    });
  });

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Signout;
