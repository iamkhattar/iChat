import React, { useState } from "react";

import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div class="mainApp ">
      <div class="container row align-items-center h-100 justify-content-center">
        <div class="text-center">
          <div className="srch_bar w-100 pb-2">
            <input type="text" className="w-100" placeholder="Email" />
          </div>
          <div className="srch_bar w-100 pb-2">
            <input type="password" className="w-100" placeholder="Password" />
          </div>

          <div className="pb-2" style={{ height: "2.7rem" }}>
            <Link to="/chat">
              <button className="w-100 h-100 btn btn-primary">Login</button>
            </Link>
          </div>
          <div className="text-right">
            Already a user? <Link to="/register">Register Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
