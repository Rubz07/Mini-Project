import React from "react";

import { Link } from "react-router-dom";
import "./ComplaintList.css";
function ComplaintList({ complaint }) {
  console.log(complaint);
  return (
    <div className="complaintDetails">
      <div className="complaintTitle">Complaints</div>

      <div class="datas">
        <div class="data">
          <table>
            <tr>
              <th style={{ padding: "20px" }}>Sl.No</th>
              <th>Registration Id</th>
              <th>Department</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
            {complaint &&
              complaint.length > 0 &&
              complaint.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td width="200px">{index}</td>
                    <td width="200px">{data.registrationNo}</td>
                    <td width="200px">{data.department}</td>
                    <td width="200px">{data.description}</td>
                    <td width="200px">{data.date}</td>
                    <td width="200px">{data.status}</td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ComplaintList;
