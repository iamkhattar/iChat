import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Register = () => {
  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      email === "" ||
      password === "" ||
      repeatPassword === "" ||
      name === ""
    ) {
      setErrors([...errors, "All fields must be filled"]);
    } else if (password !== repeatPassword) {
      setErrors([...errors, "Passwords dont match"]);
    }
    if (errors.length > 0) return setTimeout(() => setErrors([]), 3000);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ name, email, password });
      const res = await axios.post("/api/register", body, config);
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
        <form className="text-center w-50" onSubmit={(e) => onSubmit(e)}>
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
              type="text"
              className="w-100"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="srch_bar w-100 pb-2">
            <input
              type="email"
              className="w-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="srch_bar w-100 pb-2">
            <input
              type="password"
              className="w-100"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="srch_bar w-100 pb-3">
            <input
              type="password"
              className="w-100"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="pb-2" style={{ height: "2.7rem" }}>
            <button className="w-100 h-100 btn btn-primary" type="submit">
              Register
            </button>
          </div>
          <div className="text-right">
            Already a user? <Link to="/">Login Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
