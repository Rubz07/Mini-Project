import React from "react";
import image1 from "../../../Assets/images/image-1.png";
function Login() {
  return (
    <div className="wrapper">
      <div className="loginimage">
        {" "}
        <img src={image1} alt="" class="image-1" />
      </div>
      <div className="inner">
        <form action="">
          ]
          <div className="form-holder login-email">
            <span className="lnr lnr-envelope"></span>
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="form-holder login-password">
            <span className="lnr lnr-lock"></span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <input type="button" value="login" className="btn1"></input>
        </form>
      </div>
    </div>
  );
}

export default Login;
