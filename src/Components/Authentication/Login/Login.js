import React, { useState, useEffect } from "react";
import image1 from "../../../Assets/images/image-1.png";
import axios from "../../../axios";
import { Route, useHistory, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
function Login() {
  const history = useHistory();

  const loginErr = document.querySelector(".loginErr");

  const [password, setPassword] = useState();

  const [mobile, setmobile] = useState();

  // NAV BAR
  const diffLogin = (e) => {
    history.push(`/${e}`);
  };
  // NAV BAR
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
    await axios.post("/login", data).then((res) => {
      if (res.status == 400) {
        console.log("huuuuuuuuuuuuuuu");
      } else {
        console.log("gjjjjjjjjjjjjjjjjj");
      }
    });

    // if (res.status === 200 && res.data.verify === true) {
    //   window.localStorage.setItem("auth-token", res.data.authToken);
    //   console.log(res.data.role);
    //   if (res.data.role === "admin") {
    //     history.push("/Admindashboard");
    //   } else {
    //     history.push("/dashboard");
    //   }
    // } else {
    //   console.log("hii");
    //   loginErr.classList.remove("loginErr-hidden");
    // }
  };

  // useEffect(() => {
  //   const isToken = localStorage.getItem("auth-token");
  //   if (isToken) {
  //     history.push("/dashboard");
  //   }
  // }, [history]);

  return (
    <Route>
      {/* NAV BAR */}

      <header>
        <div class="container">
          <div class="logo">
            <p className="logo-title">CM-Portal</p>
          </div>

          <div class="links">
            <select
              className="btn5"
              onChange={(e) => diffLogin(e.target.value)}
            >
              <option value="">user</option>
              <option value="Officerlogin">Officer</option>
              <option value="SubOfficerlogin">Sub Officer</option>
            </select>
          </div>

          <div class="overlay"></div>

          <div class="hamburger-menu">
            <div class="bar"></div>
          </div>
        </div>
      </header>

      {/* NAV BAR */}

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
                autocomplete="off"
                onChange={(e) => setmobile(e.target.value)}
              />
            </div>

            <div className="form-holder password">
              <input
                type="password"
                className="form-control"
                value={password}
                autocomplete="off"
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
