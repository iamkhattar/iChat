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
          <div>
            <h2>Sign In</h2>
          </div>
          <div>
            <input type="text" placeholder="Email" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>
          <div>
            <Link to="/chat">
              <button>Login</button>
            </Link>
          </div>
          <div>
            Not a user? <Link to="/register">Register Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
