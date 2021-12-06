import React, { useState, useEffect } from "react";
import "./ComplaintForm.css";
import { Link, Route, useLocation } from "react-router-dom";

function ComplaintForm() {
  const [departmentName, setDepartmentName] = useState(null);

  const location = useLocation();
  useEffect(() => {
    const { department } = location;
    setDepartmentName(department);
  }, [location]);
  return (
    <div className="complaintForm">
      <div className="form-title">Complaint</div>
      <form>
        <div className="complaint-details">
          <div className="input-box">
            <span className="details">Select category</span>
            <select className="drp-control" data-flag="true">
              <option value="  " selected>
                Select Category
              </option>
              <option>Bill Related</option>
              <option>drainage</option>
            </select>
          </div>

          <div className="input-box">
            <span className="details">Full name</span>
            <input
              type="text"
              className="complaint-input"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Full Name</span>
            <input
              type="text"
              className="complaint-input"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Full Name</span>
            <input
              type="text"
              className="complaint-input"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Full Name</span>
            <input
              type="text"
              className="complaint-input"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Full Name</span>
            <input
              type="text"
              className="complaint-input"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Upload Proof</span>
            <input type="file" className="complaint-proof" name="" id="" />
          </div>
          <div className="complaint-submit">
            <input type="button" className="complaint-submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ComplaintForm;
