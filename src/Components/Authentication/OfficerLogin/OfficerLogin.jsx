import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { Route, useHistory, Redirect } from "react-router-dom";
function OfficerLogin() {
  const [password, setPassword] = useState();
  const history = useHistory();

  const [officerId, setOfficerId] = useState();
  const loginErr = document.querySelector(".loginErr");
  const [errorMessage, setErrorMessage] = useState();

  // NAV BAR
  const diffLogin = (e) => {
    history.push(`/${e}`);
  };
  // NAV BAR

  const handleSubmit = async () => {
    const data = {
      officerId: officerId,
      password: password,
    };
    const res = await axios.post("officer/login", data);
    try {
      if (res.status === 200 && res.data.status === true) {
        window.localStorage.setItem("officer-token", res.data.authToken);
        history.push("/Officerdashboard");
      } else {
        setErrorMessage(res.data.message);
        loginErr.classList.remove("loginErr-hidden");
      }
    } catch (error) {
      alert("some error occured");
    }
  };
  useEffect(() => {
    const isToken = localStorage.getItem("officer-token");
    if (isToken) {
      history.push("/Officerdashboard");
    }
  }, [history]);
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
              <option value="">Officer</option>
              <option value="login">User</option>
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
            <h3>Officer Login</h3>
            <div className="form-holder mobile">
              <span className="lnr lnr-envelope"></span>
              <input
                type="text"
                className="form-control"
                value={officerId}
                placeholder="ID"
                onChange={(e) => setOfficerId(e.target.value)}
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
              <p>{errorMessage}</p>
            </div>
          </form>
        </div>
      </div>
    </Route>
  );
}

export default OfficerLogin;
