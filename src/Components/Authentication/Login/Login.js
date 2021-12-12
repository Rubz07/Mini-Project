import React, { useState, useEffect } from "react";
import image1 from "../../../Assets/images/image-1.png";
import axios from "../../../axios";
import { Route, useHistory, Redirect } from "react-router-dom";
import "./Login.css";
function Login() {
  const history = useHistory();
  const fullMobileError = document.querySelector(".mobile .error");
  const fullPasswordError = document.querySelector(".password .error");
  const regSubBtn = document.querySelector("#reg-btn");
  const buttonCursor = document.querySelector(".button");

  const [loginError, setLogginError] = useState("login failed");
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [mobile, setmobile] = useState();
  const [mobileError, setmobileError] = useState();

  var phnoChk = /^([0-9_\-]{10})+$/;
  const validPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  // const validateMobile = () => {
  //   if (phnoChk.test(mobile)) {
  //     setmobileError(false);
  //   } else if (mobile == "") {
  //     fullMobileError.innerText = "Field cannot be blank";
  //     setmobileError(true);
  //   } else {
  //     fullMobileError.innerText = "Invalid mobile number";
  //     setmobileError(true);
  //   }
  // };

  // const validatePassword = () => {
  //   if (validPassword.test(password)) {
  //     setPasswordError(false);
  //   } else if (password == "") {
  //     fullPasswordError.innerText = "Field cannot be blank";
  //     setPasswordError(true);
  //   } else {
  //     fullPasswordError.innerText = "Invalid Password";
  //     setPasswordError(true);
  //   }
  // };

  //=========API CALLING====================//

  const handleSubmit = async () => {
    const data = {
      mobile: mobile,
      password: password,
    };
    const res = await axios.post("/login", data);
    console.log(res);
    if (res.status === 200 && res.data.verify === true) {
      window.localStorage.setItem("auth-token", res.data.authToken);
      if (res.data.role === "admin") {
        history.push("/Admindashboard");
      } else {
        history.push("/dashboard");
      }
    } else {
      alert("Login failed");
    }
  };

  useEffect(() => {
    const isToken = localStorage.getItem("auth-token");
    if (isToken) {
      history.push("/dashboard");
    }
  }, [history]);

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
            <div className="form-holder mobile">
              <span className="lnr lnr-envelope"></span>
              <input
                type="text"
                className="form-control"
                value={mobile}
                placeholder="mobile"
                onChange={(e) => setmobile(e.target.value)}
              />
            </div>

            <div className="form-holder password">
              <input
                type="password"
                className="form-control"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="button">
              <input
                type="button"
                value="Login"
                id="reg-btn"
                class="btn1 primary-button "
                onClick={handleSubmit}
              ></input>
            </div>
            <div className="loginErr loginErr-hidden ">
              <p>Login failed</p>
            </div>
          </form>
        </div>
      </div>
    </Route>
  );
}

export default Login;
