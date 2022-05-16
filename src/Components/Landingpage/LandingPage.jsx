import React from "react";
import "./LandingPage.css";
import shape from "../../Assets/images/shape.png";
import logo from "../../Assets/images/logo.png";
import person from "../../Assets/images/aa.png";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <main>
      <div class="big-wrapper light">
        <img src={shape} alt="" class="shape" />

        <header>
          <div class="container">
            <div class="logo">
              <p className="logo-title">CM-Portal</p>
            </div>

            <div class="links">
              <ul>
                <li>
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
                <li>
                  <a href="#">Testimonials</a>
                </li>
                <li>
                  <Link to="/login" className="btn">
                    Login
                  </Link>
                  <Link to="/otpauth" className="btn">
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>

            <div class="overlay"></div>

            <div class="hamburger-menu">
              <div class="bar"></div>
            </div>
          </div>
        </header>

        <div class="showcase-area">
          <div class="container">
            <div class="left">
              <div class="big-title">
                <h1>
                  Standardize the Complaints Workflow to Ensure Maximum Customer
                  Satisfaction
                </h1>
              </div>
              <p class="text">
                Transforms Customer Complaints into Growth and Improvement
                Opportunities
              </p>
              {/* <div class="cta">
                <a href="#" class="btn">
                  Get started
                </a>
              </div> */}
            </div>

            <div class="right">
              <img src={person} alt="Person Image" class="person" />
            </div>
          </div>
        </div>

        <div class="bottom-area">
          <div class="container"></div>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
