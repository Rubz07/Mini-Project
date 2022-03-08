import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useHistory } from "react-router-dom";
function SubOfficerLogin() {
  const [password, setPassword] = useState();
  const history = useHistory();
  const [officerId, setOfficerId] = useState();

  const handleSubmit = async () => {
    const data = {
      officerId: officerId,
      password: password,
    };
    const res = await axios.post("officer/login", data);
    try {
      if (res.status === 200 && res.data.verify === true) {
        window.localStorage.setItem("Subofficer-token", res.data.authToken);
        history.push("/SubOfficerdashboard");
      } else {
        alert("some error occured");
      }
    } catch (error) {
      alert("some error occured");
    }
  };
  useEffect(() => {
    const isToken = localStorage.getItem("Subofficer-token");
    if (isToken) {
      history.push("/SubOfficerdashboard");
    }
  }, [history]);
  return (
    <div className="wrapper">
      <div className="img1">
        {" "}
        {/* <img src={image1} alt="" class="image-1" /> */}
      </div>
      <div className="inner">
        <form action="" id="reg-form">
          <h3>Subofficer Login</h3>
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
            <p>Login failed</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubOfficerLogin;
