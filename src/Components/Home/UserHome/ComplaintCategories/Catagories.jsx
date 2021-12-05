import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../../axios";
import "./Catagories.css";
function Catagories() {
  const [departments, setDepartments] = useState([]);

  async function getDepartments() {
    let response = await axios.get(`admin/get-departments`);
    if (response.status === 200) {
      console.log(response.data);
      setDepartments(response.data.departments);
    }
  }

  useEffect(() => {
    getDepartments();
  }, []);
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
          {departments &&
            departments.length > 0 &&
            departments.map((p) => {
              return (
                <div className="category_card card_a">
                  <i className=" fa fa-university fa-2x text-blue "></i>
                  <div className="category_card_inner">
                    <Link to="/water">
                      <p className="text-cat-p">{p.departmentname}</p>
                    </Link>
                  </div>
                </div>
              );
            })}

          {/* <div className="category_card card_b">
            <i className="fa fa-file-alt fa-2x text-blue"></i>
            <div className="category_card_inner">
              <p className="text-cat-p">Banking</p>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}

export default Catagories;
