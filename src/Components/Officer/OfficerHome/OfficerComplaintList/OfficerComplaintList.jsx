import React, { useState } from "react";
import "./OfficerComplaintList.css";
function OfficerComplaintList({ complaint }) {
  return (
    <div className="complaintDetails">
      <div className="complaintTitle">Complaints</div>

      <div class="datas">
        <div class="data">
          <table>
            <tr>
              <th style={{ padding: "20px" }}>Sl.No</th>
              <th>Complaint Id</th>
              <th> Description</th>
              <th>User Name</th>
              <th>User Mobile</th>
              <th>Proof</th>
              <th>Action</th>
            </tr>
            {complaint &&
              complaint.length > 0 &&
              complaint.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td width="200px">{index}</td>
                    <td width="200px">{data.complaint_regid}</td>
                    <td width="200px">{data.complaint_description}</td>
                    <td width="200px">Rubin Siby</td>
                    <td width="200px">9048317092</td>
                    <td width="200px"></td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default OfficerComplaintList;
