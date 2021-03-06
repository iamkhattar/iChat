import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link, Redirect } from "react-router-dom";
import "./Login.css";

const Login = () => {
  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrors([...errors, "All fields must be filled"]);
    }
    if (errors.length > 0) return setTimeout(() => setErrors([]), 3000);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post("/api/login", body, config);
      const token = res.data.token;
      localStorage.setItem("x-auth-token", token);
      setIsAuthenticated(true);
    } catch (err) {
      var errs = err.response.data.errors;
      var newErrs = [];
      errs.map((currentErr) => newErrs.push(currentErr.msg));
      setErrors(newErrs);
      return setTimeout(() => setErrors([]), 3000);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/chat" />;
  }

  return (
    <div className="mainApp ">
      <div className="container row align-items-center h-100 justify-content-center">
        <form className="text-center" onSubmit={(e) => onSubmit(e)}>
          <div>
            <h2>iChat</h2>
          </div>
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
              required={true}
            />
          </div>
          <div className="srch_bar w-100 pb-2">
            <input
              type="password"
              className="w-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required={true}
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
