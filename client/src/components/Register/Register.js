import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="mainApp ">
      <div className="container row align-items-center h-100 justify-content-center">
        <div className="text-center">
          <div className="srch_bar w-100 pb-2">
            <input type="text" className="w-100" placeholder="Name" />
          </div>
          <div className="srch_bar w-100 pb-2">
            <input type="text" className="w-100" placeholder="Email" />
          </div>
          <div className="srch_bar w-100 pb-2">
            <input type="password" className="w-100" placeholder="Password" />
          </div>
          <div className="srch_bar w-100 pb-3">
            <input
              type="password"
              className="w-100"
              placeholder="Repeat Password"
            />
          </div>
          <div className="pb-2" style={{ height: "2.7rem" }}>
            <Link to="/chat">
              <button className="w-100 h-100 btn btn-primary">Register</button>
            </Link>
          </div>
          <div className="text-right">
            Already a user? <Link to="/">Login Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
