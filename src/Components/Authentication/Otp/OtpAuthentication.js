import React, { useState } from "react";
import axios from "../../../axios";
import "./OtpAuthentication.css";
function OtpAuthentication() {
  const fullMobileError = document.querySelector(".mobile .error");
  const verifyInput = document.querySelector(".otpform-holder");
  const regSubBtn = document.querySelector("#reg-btn");

  const [mobile, setMobile] = useState();
  const [otpcode, setOtpCode] = useState();
  const [mobileError, setMobileError] = useState();

  const validPhone = /^([0-9_\-]{10})+$/;

  const validateMobile = () => {
    if (validPhone.test(mobile)) {
      setMobileError(false);
    } else if (mobile == "") {
      fullMobileError.innerText = "Field cannot be blank";
      setMobileError(true);
    } else {
      fullMobileError.innerText = "Invalid phone number";
      setMobileError(true);
    }
  };

  

  //===================API CALLING=====================//

  const sendOtp = async () => {
    const data = {
      mobile: mobile,
    };
    const res = await axios.post("/otpAuthentication", data);
    if (res.status === 200) {
      console.log(res);
    } else {
      console.log(res.data.message);
    }
  };


  const verifyOtp = async () => {
    const data = {
      otpcode: otpcode,
    };
    const res = await axios.post("/otpAuthentication", data);
    if (res.status === 200) {
      console.log(res);
    } else {
      console.log(res.data.message);
    }
  };

  //===================API CALLING=====================//

  return (
    <div className="wrapper">
      <div className="img1">
        {" "}
        {/* <img src={image1} alt="" class="image-1" /> */}
      </div>
      <div className="inner">
        <form action="" id="reg-form">
          <h3>Verify</h3>
          <div className="mobileinput">
            <div className="otpform-holder mobile">
              <span className="lnr lnr-phone-handset"></span>
              <input
                type="text"
                className="otpform-control"
                value={mobile}
                placeholder="Phone Number"
                onChange={(e) => setMobile(e.target.value)}
                onKeyUp={validateMobile}
              />
              <div
                className={
                  mobileError ? "error error-visible " : "error error-hidden"
                }
              ></div>
            </div>
            <div className="button">
              <input
                type="button"
                value="Send Otp"
                id="reg-btn"
                class="btn1 "
                onClick={sendOtp}
              ></input>
            </div>
          </div>
          <div className="otpform-holder mobile hidden-mob">
            <span className="lnr lnr-phone-handset"></span>
            <input
              type="text"
              className="otpform-control "
              value={otpcode}
              placeholder="Otp Code"
              onChange={(e) => setOtpCode(e.target.value)}
              onKeyUp={verifyOtp}
            />
            <div
              className={
                mobileError ? "error error-visible " : "error error-hidden"
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
  );
}

export default OtpAuthentication;
