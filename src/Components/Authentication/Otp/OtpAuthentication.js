import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../../axios";
import "./OtpAuthentication.css";
import Lottie from "react-lottie";
import Checkanimation from "../../../Assets/Lottie/CheckAnimation.json";

function OtpAuthentication() {
  const history = useHistory();

  const fullMobileError = document.querySelector(".mobile .error");
  const fullverifyError = document.querySelector(".verify .error");
  const verifyInput = document.querySelector(".verifyotpform-holder");
  const verifyCheck = document.querySelector(".Checkanimation");
  const loginerr = document.querySelector(".loginErr");
  const regSubBtn = document.querySelector("#reg-btn");
  const [mobile, setMobile] = useState();
  const [otpcode, setOtpCode] = useState();
  const [sendOtpcode, setSendOtpCode] = useState("Send Otp");
  const [otpError, setOtpError] = useState(false);
  const [mobileError, setMobileError] = useState();

  const validPhone = /^([0-9_\-]{10})+$/;
  const validOtp = /^([0-9_\-]{6})+$/;

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

  // const validateOtp = () => {
  //   if (validOtp.test(otpcode)) {
  //     setOtpError(false);
  //   } else if (otpcode == "") {
  //     setOtpError(false);
  //   } else {
  //     setOtpError(false);
  //   }
  // };

  //===========Lottie Options======================//

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: Checkanimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const buttonCursor = document.querySelector(".button"); //To avoid poniterevent and cursor problem
  const submitval = () => {
    console.log(otpError);
    // if (sendOtpcode == "Resend") {
    //   regSubBtn.classList.remove("disabled");
    //   buttonCursor.classList.remove("cursor-disabled");
    // } else {
    //   regSubBtn.classList.add("disabled");
    //   buttonCursor.classList.add("cursor-disabled");
    // }
  };

  //===================API CALLING=====================//

  const sendOtp = async () => {
    const data = {
      mobile: mobile,
    };
    try {
      await axios
        .post("/otpAuthentication", data)
        .then((res) => {
          console.log(res.status);
          if (res.status == 200) {
            setSendOtpCode("Resend");
            verifyInput.classList.remove("hidden-mob");
            regSubBtn.classList.remove("disabled");
            buttonCursor.classList.remove("cursor-disabled");
          } else {
            verifyInput.classList.add("hidden-mob");
            console.log(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    const data = {
      otpcode: otpcode,
      mobile: mobile,
    };
    const res = await axios.post("/otpVerification", data);
    console.log(res);
    if (res.status === 200 && res.data.verify === "approved") {
      setOtpError(true);
      loginerr.classList.add("login-error");
      verifyCheck.classList.remove("anim-hidden");
      console.log(res);
    } else {
      loginerr.classList.remove("login-error");
      verifyCheck.classList.add("anim-hidden");
    }
  };

  const nextreg = () => {
    console.log(otpError);
    if (otpError == true) {
      history.push({
        pathname: "/register",
        
        state: { mobile: mobile },
      });
    } else {
      fullverifyError.innerText = "Entered otp is incorrect";
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
        <form action="" id="reg-form" onKeyUp={submitval}>
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
                value={sendOtpcode}
                id="Otpbtn"
                class="btn1 "
                onClick={sendOtp}
              ></input>
            </div>
          </div>
          <div className="verifyOtpinput">
            <div className="verifyotpform-holder verify hidden-mob">
              <span className="lnr lnr-phone-handset"></span>
              <input
                type="text"
                className="otpform-control "
                value={otpcode}
                placeholder="Otp Code"
                onChange={(e) => setOtpCode(e.target.value)}
                onBlur={verifyOtp}
              />

              <div
                className={
                  mobileError ? "error error-visible " : "error error-hidden"
                }
              ></div>
            </div>
            <div className="Checkanimation anim-hidden">
              <Lottie options={defaultOptions} height={30} width={30} />
            </div>
          </div>
          <div className="button cursor-disable">
            <input
              type="button"
              value="Verify"
              id="reg-btn"
              class="btn1 primary-button disabled"
              onClick={nextreg}
            ></input>
          </div>
          <div className="loginErr login-error">
            <p>Entered Otp is incorrect</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpAuthentication;
