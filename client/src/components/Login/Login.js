import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    localStorage.clear();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrors([...errors, "All fields must be filled"]);
    }
    if (errors.length > 0) setTimeout(() => setErrors([]), 3000);

    console.log(email);
    console.log(password);
  };

  return (
    <div className="mainApp ">
      <div className="container row align-items-center h-100 justify-content-center">
        <form className="text-center" onSubmit={(e) => onSubmit(e)}>
          {errors.map((error) => {
            return (
              <div
                className="alert alert-danger"
                role="alert"
                style={{ height: "2.7rem" }}
                key={error}
              >
                {error}
              </div>
            );
          })}

          <div className="srch_bar w-100 pb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-100"
              placeholder="Email"
            />
          </div>
          <div className="srch_bar w-100 pb-2">
            <input
              type="password"
              className="w-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="pb-2" style={{ height: "2.7rem" }}>
            <button className="w-100 h-100 btn btn-primary" type="submit">
              Login
            </button>
          </div>
          <div className="text-right">
            Already a user? <Link to="/register">Register Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
