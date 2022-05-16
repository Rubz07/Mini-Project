import React, { useState, useEffect } from "react";
import axios from "../../../../axios";
import "./Complaints.css";

function Complaints() {
  const [department, setDepartmentList] = useState(null);
  const [complaints, setComplaints] = useState(null);

  async function handleChange(e, id, regid, description, status) {
    console.log(id, regid, description);
    const data = {
      complaint_department: e.target.value,
      complaint_id: id,
      complaint_regid: regid,
      complaint_description: description,
      complaint_status: status,
    };

    let response = await axios.post(`admin/assign-complaint`, data);
    if (response.status === 200 && response.data.verify === "success") {
      getComplaints();
    }
  }

  async function getComplaints() {
    let response = await axios.get(`admin/getComplaint`);
    if (response.status === 200) {
      console.log(response);
      setComplaints(response.data.complaint);
    }
  }

  async function getDepartments() {
    let response = await axios.get(`admin/get-departments`);
    if (response.status === 200) {
      setDepartmentList(response.data.departments);
    }
  }

  useEffect(() => {
    getComplaints();
    getDepartments();
  }, []);
  return (
    <div className="report-main">
      <div class="report-container">
        <div class="report-content">
          <div className="reportinput-box">
            <span className="report-details">Select Department</span>
            <select style={{ width: "200px" }} id="cars">
              );
              {department &&
                department.length > 0 &&
                department.map((p) => {
                  return (
                    <option value={p.registrationNo}>{p.departmentname}</option>
                  );
                })}
            </select>
          </div>
          <div className="report-submit">
            <input
              type="button"
              className="report-submitbtn"
              value="Check"
              // onClick={(e) => fetchStatus(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
