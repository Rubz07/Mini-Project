import React, { useState } from "react";
import image1 from "../../../Assets/images/image-1.png";
import axios from "../../../axios";
import { Link, Route, useHistory } from "react-router-dom";
import "./Login.css";
function Login() {
  const history = useHistory();
  const fullMobileError = document.querySelector(".mobile .error");
  const fullPasswordError = document.querySelector(".password .error");
  const regSubBtn = document.querySelector("#reg-btn");
  const buttonCursor = document.querySelector(".button");

  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [mobile, setmobile] = useState();
  const [mobileError, setmobileError] = useState();

  var phnoChk = /^([0-9_\-]{10})+$/;
  const validPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const validateMobile = () => {
    if (phnoChk.test(mobile)) {
      setmobileError(false);
    } else if (mobile == "") {
      fullMobileError.innerText = "Field cannot be blank";
      setmobileError(true);
    } else {
      fullMobileError.innerText = "Invalid mobile number";
      setmobileError(true);
    }
  };

  const validatePassword = () => {
    if (validPassword.test(password)) {
      setPasswordError(false);
    } else if (password == "") {
      fullPasswordError.innerText = "Field cannot be blank";
      setPasswordError(true);
    } else {
      fullPasswordError.innerText = "Invalid Password";
      setPasswordError(true);
    }
  };

  const submitval = () => {
    if (mobileError == false && passwordError == false) {
      regSubBtn.classList.remove("disabled");
      buttonCursor.classList.remove("cursor-disabled");
    } else {
      regSubBtn.classList.add("disabled");
      buttonCursor.classList.add("cursor-disabled");
    }
  };

  //=========API CALLING====================//

  const handleSubmit = async () => {
    const data = {
      mobile: mobile,
      password: password,
    };
    const res = await axios.post("/login", data);
    if (res.status === 200) {
      await window.localStorage.setItem("auth", res.data.authToken);
      history.push("/dashboard");
    } else {
      //need to doo some edit
      console.log(res.data.message);
    }
  };

  return (
    <Route>
      <div className="wrapper">
        <div className="img1">
          {" "}
          {/* <img src={image1} alt="" class="image-1" /> */}
        </div>
        <div className="inner">
          <form action="" id="reg-form" onKeyUp={submitval}>
            <h3>Login</h3>
            <div className="form-holder mobile">
              <span className="lnr lnr-envelope"></span>
              <input
                type="text"
                className="form-control"
                value={mobile}
                placeholder="mobile"
                onChange={(e) => setmobile(e.target.value)}
                onKeyUp={validateMobile}
              />
              <div
                className={
                  mobileError ? "error error-visible " : "error error-hidden"
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
                onKeyUp={validatePassword}
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
                onClick={handleSubmit}
              ></input>
            </div>
          </form>
        </div>
      </div>
    </Route>
  );
}

export default Login;
