import React, { useState } from "react";
import axios from "../../../axios";
import { Link, Route } from "react-router-dom";
// import image1 from "../../../Assets/images/image-1.png";
// import image2 from "../../../Assets/images/image-2.png";

import "./Registration.css";
const Registration = () => {
  //========================State Management=====================//

  const fullNameError = document.querySelector(".fullname .error");
  const fullEmailError = document.querySelector(".emailclass .error");
  const fullMobileError = document.querySelector(".mobile .error");
  const fullPincodeError = document.querySelector(".pincodeclass .error");
  const fullPasswordError = document.querySelector(".password .error");
  const fullcPasswordError = document.querySelector(".confirmpassword .error");
  const regSubBtn = document.querySelector("#reg-btn");

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [district, setDistrict] = useState();
  const [pincode, setPincode] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setcPassword] = useState();

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [pincodeError, setPincodeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmpasswordError, setconfirmPasswordError] = useState(false);

  const validName = /^[a-zA-Z]+$/;
  const validEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const validPhone = /^([0-9_\-]{10,13})+$/;
  const validPincode = /^[1-9][0-9]{5}$/;
  const validPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  //========================Validation function=====================//

  const validateName = () => {
    if (validName.test(name)) {
      setNameError(false);
    } else if (name == "") {
      fullNameError.innerText = "Field cannot be blank";
      setNameError(true);
    } else {
      fullNameError.innerText = "Name should not contain numbers";
      setNameError(true);
    }
  };

  const validateEmail = () => {
    if (validEmail.test(email)) {
      setEmailError(false);
    } else if (email == "") {
      fullEmailError.innerText = "Field cannot be blank";
      setEmailError(true);
    } else {
      fullEmailError.innerText = "Invalid mail id";
      setEmailError(true);
    }
  };

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

  const validatePincode = () => {
    if (validPincode.test(pincode)) {
      setPincodeError(false);
    } else if (pincode == "") {
      fullPincodeError.innerText = "Field cannot be blank";
      setPincodeError(true);
    } else {
      fullPincodeError.innerText = "Invalid Pincode";
      setPincodeError(true);
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

  const validateConfirmPassword = () => {
    if (cpassword == password) {
      setconfirmPasswordError(false);
    } else if (cpassword == "") {
      fullcPasswordError.innerText = "Field cannot be blank";
    } else {
      fullcPasswordError.innerText = "Password mismatch";
      setconfirmPasswordError(true);
    }
  };

  //Submit Button Visibility
  const buttonCursor = document.querySelector(".button"); //To avoid poniterevent and cursor problem

  const submitval = () => {
    if (
      fullNameError == false &&
      emailError == false &&
      mobileError == false &&
      addressError == false &&
      pincodeError == false &&
      passwordError == false
    ) {
      regSubBtn.classList.remove("disabled");
      buttonCursor.classList.remove("cursor-disabled");
    } else {
      regSubBtn.classList.add("disabled");
      buttonCursor.classList.add("cursor-disabled");
    }
  };
  //========================API CALLING=====================//

  const handleSubmit = async () => {
    const data = {
      name: name,
      email: email,
      mobile: mobile,
      address: address,
      pincode: pincode,
      password: password,
      confirmpassword: cpassword,
    };

    const res = await axios.post("/register", data);
    if (res.status === 200) {
      console.log(res);
    } else {
      //need to doo some edit
      console.log(res.data.message);
    }
  };
  //========================Main Body=====================//
  return (
    <Route>
      <div className="wrapper">
        <div className="img1">
          {" "}
          {/* <img src={image1} alt="" class="image-1" /> */}
        </div>
        <div className="inner">
          <form action="" id="reg-form" onKeyUp={submitval}>
            <h3>New Account?</h3>
            <div className="form-holder fullname">
              <span className="lnr lnr-user"></span>
              <input
                type="text"
                className="form-control"
                value={name}
                id="full-name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                onKeyUp={validateName}
              />
              <div
                className={
                  nameError ? "error error-visible " : "error error-hidden"
                }
              ></div>
            </div>

            <div className="input2">
              <div className="form-holder emailclass">
                <span className="lnr lnr-envelope"></span>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={validateEmail}
                />
                <div
                  className={
                    emailError ? "error error-visible " : "error error-hidden"
                  }
                ></div>
              </div>
              <div className="form-holder mobile">
                <span className="lnr lnr-phone-handset"></span>
                <input
                  type="text"
                  className="form-control"
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
            </div>

            <div className="form-holder address">
              <span className="lnr lnr-phone-handset"></span>
              <input
                type="address"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="dropdwn">
              <span className="lnr lnr-drop-down"></span>
              <select
                className="drp-control"
                data-flag="true"
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="  " selected>
                  Select District
                </option>
                <option>Afghanistan</option>
                <option value="Alappuzha">Alappuzha</option>
                <option value="Ernakulam">Ernakulam</option>
                <option value="Idukki">Idukki</option>
                <option value="Kannur">Kannur</option>
                <option value="Kasaragod">Kasaragod</option>
                <option value="Kollam">Kollam</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Wayanad">Wayanad</option>
              </select>
            </div>
            <div className="form-holder pincodeclass">
              <span className="lnr lnr-phone-handset"></span>
              <input
                type="text"
                className="form-control"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                onKeyUp={validatePincode}
              />

              <div
                className={
                  pincodeError ? "error error-visible " : "error error-hidden"
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
            <div className="form-holder confirmpassword">
              <span className="lnr lnr-lock"></span>
              <input
                type="password"
                className="form-control"
                value={cpassword}
                placeholder="Confirm Password"
                onChange={(e) => setcPassword(e.target.value)}
                onKeyUp={validateConfirmPassword}
              />
              <div
                className={
                  confirmpasswordError
                    ? "error error-visible "
                    : "error error-hidden"
                }
              ></div>
            </div>
            <div className="button cursor-disable">
              <input
                type="button"
                value="Register"
                id="reg-btn"
                class="primary-button disabled"
                onClick={handleSubmit}
              ></input>
            </div>
          </form>
        </div>
      </div>
    </Route>
  );
};

export default Registration;
