import React, { useState } from "react";

import { productRows } from "../../../../dummyData";
import { Link } from "react-router-dom";
import "./ComplaintList.css";
function ComplaintList({ complaint }) {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="complaintDetails">
      <div className="complaintTitle">Complaints</div>

      <div class="datas">
        <div class="data">
          <table>
            <tr>
              <th style={{ padding: "20px" }}>Sl.No</th>
              <th>Registration Number</th>
              <th>Date</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
            {complaint &&
              complaint.length > 0 &&
              complaint.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td width="200px">{index}</td>
                    <td width="200px">{data.registrationNo}</td>
                    <td width="200px">{data.date}</td>
                    <td width="200px">{data.description}</td>
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
