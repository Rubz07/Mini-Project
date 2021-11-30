import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../../../dummyData";
import { Link } from "react-router-dom";
import "./ComplaintList.css";
function ComplaintList({ complaint }) {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  let person = { registrationNo: complaint.registrationNo };
  const columns = [
      { field: "id", headerName: "Sn.", width: 200 },

      {
        field: "registrationNo",
        headerName: "Registration Number",
        width: 200,
      },

      {
        field: "date",
        headerName: "Received Date",
        width: 200,
      },
      {
        field: "description",
        headerName: "Grievance description",
        width: 200,
      },
      {
        field: "status",
        headerName: "Status",
        width: 200,
      },
    ],
    rows = [
      {
        id: 1,
        registrationNo: complaint.date,
        date: complaint.date,
        description: complaint.description,
        status: complaint.status,
      },
    ];
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
