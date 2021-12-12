import React, { useState, useEffect } from "react";
import axios from "../../../../axios";
import "./Complaints.css";
import { DeleteOutline } from "@material-ui/icons";
function Complaints() {
  const [department, setDepartmentList] = useState(null);
  const [complaints, setComplaints] = useState(null);

  async function handleChange(e, id, regid, description) {
    console.log(id, regid, description);
    const data = {
      complaint_department: e.target.value,
      complaint_id: id,
      complaint_regid: regid,
      complaint_description: description,
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
    <div className="complaintList">
      <div className="complaintTitle">complaints</div>
      <div class="complaintDatas">
        <div class="complaintData">
          <table>
            <tr>
              <th style={{ padding: "20px" }}>Sl.No</th>
              <th>Registration Id</th>
              <th>Department</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {complaints &&
              complaints.length > 0 &&
              complaints.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td>{index}</td>
                    <td width="200px">{data.registrationNo}</td>
                    <td width="200px">{data.department}</td>
                    <td width="200px">{data.description}</td>
                    <td width="200px">{data.date}</td>
                    <td width="230px">
                      <div class="input_field cmpselect_option">
                        <select
                          onChange={(e) =>
                            handleChange(
                              e,
                              data._id,
                              data.registrationNo,
                              data.description
                            )
                          }
                        >
                          <option>Select Deparment</option>
                          {department &&
                            department.length > 0 &&
                            department.map((p) => {
                              return (
                                <option value={p.registrationNo}>
                                  {p.departmentname}
                                </option>
                              );
                            })}
                        </select>
                        <div class="select_arrow"></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
