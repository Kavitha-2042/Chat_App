import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/signout">
        <h1
          className="font-bold"
          style={{
            color: "lavender",
            fontSize: "30px",
            fontFamily:"serif",
            
          }}
        >
          Chat_App 
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
