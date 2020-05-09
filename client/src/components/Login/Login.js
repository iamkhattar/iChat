import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div class="mainApp ">
      <div class="container row align-items-center h-100 justify-content-center">
        <div className="  ">
          <h2>Sign In</h2>
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default Login;
