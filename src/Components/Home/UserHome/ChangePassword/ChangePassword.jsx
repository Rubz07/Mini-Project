import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
import axios from "../../../../axios";
function ChangePassword() {
  const [otp, setOtp] = useState(null);
  const [pass, setPass] = useState(null);
  const [userId, setUserId] = useState(null);
  const [mobile, setMobile] = useState(null);
  const fullPasswordError = document.querySelector(".password .error");
  const passSuccss = document.querySelector(".pass-success");
  const otperr = document.querySelector(".otp-error");
  const otpVerify = document.querySelector(".pass-main");
  const regSubBtn = document.querySelector("#passup-btn");
  const buttonCursor = document.querySelector(".pass-submit");
  const [passwordError, setPasswordError] = useState(true);

  const validPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const validatePassword = () => {
    if (validPassword.test(pass)) {
      setPasswordError(false);
    } else if (pass == "") {
      fullPasswordError.innerText = "Field cannot be blank";
      setPasswordError(true);
    } else {
      fullPasswordError.innerText = "Invalid Password";
      setPasswordError(true);
    }
  };

  const submitval = () => {
    if (passwordError === false) {
      regSubBtn.classList.remove("disabled");
      buttonCursor.classList.remove("cursor-disabled");
    } else {
      console.log("hii");
      regSubBtn.classList.add("disabled");
      buttonCursor.classList.add("cursor-disabled");
    }
  };

  //   api calling

  async function sendOtp() {
    const token = localStorage.getItem("auth-token");
    let response = await axios.post(`/changepass`, {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setUserId(response.data.userid);
      setMobile(response.data.mobile);
      console.log(response);
    }
  }

  async function verifyOtp() {
    const data = {
      mobile: mobile,
      otpcode: otp,
    };
    let response = await axios.post(`verify-passotp`, data);
    console.log(response);
    if (response.status === 200 && response.data.verify === "approved") {
      otpVerify.classList.remove("passmain-hidden");
      otperr.classList.remove("otp-error");
    } else {
      console.log("gggg");
    }
  }

  async function changePass() {
    const data = {
      userid: userId,
      newpass: pass,
    };
    let response = await axios.post(`updatepassword`, data);
    if (response.status === 200) {
      verifyOtp.classList.remove("statuslist-hide");
    } else {
      passSuccss.classList.add("pass-hidden");
    }
  }

  useEffect(() => {
    sendOtp();
  }, []);
  return (
    <div className="pass-main">
      <div className="status-main">
        <div class="status-container">
          <div className="otp-warning">
            <p>Otp has been sended to your </p>
          </div>
          <div class="status-content">
            <div className="statusinput-box">
              <span className="status-details">Otp</span>
              <input
                type="text"
                className="status-input"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="status-submit">
              <input
                type="button"
                className="status-submitbtn"
                value="Verify"
                onClick={(e) => verifyOtp(e)}
              />
            </div>
          </div>
          <div className="otp-error otperror-hidden">
            <p>Incorrect OTP!!</p>
          </div>
        </div>
      </div>
      {/* second-box */}

      <div className="pass-main passmain-hidden" onKeyUp={submitval}>
        <div class="pass-container">
          <div className="pass-success pass-hidden">
            <p>Password updated </p>
          </div>
          <div class="pass-content">
            <div className="pass-box password">
              <span className="pass-details">Enter new Password</span>
              <input
                type="password"
                className="pass-input"
                onChange={(e) => setPass(e.target.value)}
                onKeyUp={validatePassword}
              />
              <div
                className={
                  passwordError ? "error error-visible " : "error error-hidden"
                }
              ></div>
            </div>
          </div>
          <div className="pass-submit cursor-disable">
            <input
              type="button"
              id="passup-btn"
              className="pass-submitbtn disabled"
              value="Update"
              onClick={(e) => changePass(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
