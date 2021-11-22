import React from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import water from "../../../../Assets/images/water.png";
import Dashboard from "../../Dashboard/Dashboard";
import "./SelectCategory.css";
import { Link, Route, useLocation, Switch } from "react-router-dom";
function SelectCategory() {
  return (
    <main>
      <div className="category_main__container">
        {/* <div className="main__title">
          <img src={hello} alt="" />
          <div className="main__greeting">
            <h1>Hello Codersbite</h1>
            <p>Welcome to your admin dashboard</p>
          </div>
        </div> */}
        <div className="charts_header">
          <p className="text-header">
            Please select a Ministry/Department/State Government
          </p>
        </div>
        <div className="category_main__cards">
          <div className="category_card card_a">
            <i className="fa fa-hand-holding-water fa-2x text-blue "></i>
            <div className="category_card_inner">
              <Link to="/waterauthority">
                <p className="text-cat-p">Water Authority</p>
              </Link>
            </div>
          </div>

          <div className="category_card card_b">
            <i className="fa fa-file-alt fa-2x text-blue"></i>
            <div className="category_card_inner">
              <p className="text-cat-p">Banking</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SelectCategory;
