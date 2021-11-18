import React, { useState } from "react";
import image1 from "../../../Assets/images/image-1.png";
import axios from "../../../axios";
import { Link, Route } from "react-router-dom";
function Login() {
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  return (
    <Route>
      <div className="wrapper">
        <div className="img1">
          {" "}
          {/* <img src={image1} alt="" class="image-1" /> */}
        </div>
        <div className="inner">
          <form action="" id="reg-form">
            <h3>Login</h3>
            <div className="form-holder emailclass">
              <span className="lnr lnr-envelope"></span>
              <input
                type="email"
                className="form-control"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div
                className={
                  emailError ? "error error-visible " : "error error-hidden"
                }
              ></div>
            </div>

            <div className="form-holder password">
              <span className="lnr lnr-lock"></span>
              <input
                type="password"
                className="form-control"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className={
                  passwordError ? "error error-visible " : "error error-hidden"
                }
              ></div>
            </div>

            <div className="button cursor-disable">
              <input
                type="button"
                value="Register"
                id="reg-btn"
                class="btn1 primary-button disabled"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </Route>
  );
}

export default Login;
