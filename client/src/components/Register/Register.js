import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div class="mainApp ">
      <div class="container row align-items-center h-100 justify-content-center">
        <div class="text-center">
          <div>
            <h2>Sign Up</h2>
          </div>
          <div>
            <input type="text" placeholder="Email" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>
          <div>
            <input type="password" placeholder="Repeat Password" />
          </div>
          <div>
            <Link to="/chat">
              <button>Register</button>
            </Link>
          </div>
          <div>
            Already a user? <Link to="/">Login Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
