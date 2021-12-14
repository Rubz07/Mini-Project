import React, { useState, useEffect } from "react";
import "./OfficerList.css";
import { DeleteOutline } from "@material-ui/icons";
import axios from "../../../../axios";
import { Link } from "react-router-dom";
function OfficerList() {
  const [officer, setOfficer] = useState(null);

  async function getOfficers() {
    let response = await axios.get(`/admin/getOfficers`);
    if (response.status === 200) {
      console.log(response.data.officer);
      setOfficer(response.data.officer);
    }
  }
  useEffect(() => {
    getOfficers();
  }, []);
  return (
    <div className="officerList">
      <div className="officerTitle">Officers</div>
      <div class="officerDatas">
        <div class="officerData">
          <table>
            <tr>
              <th style={{ padding: "20px" }}>Sl.No</th>
              <th>Designation</th>
              <th>Officer ID</th>
              <th>Office NO</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {officer &&
              officer.length > 0 &&
              officer.map((p, index) => {
                return (
                  <tr key={officer._id}>
                    <td>{index}</td>
                    <td width="180px">{p.name}</td>
                    <td width="200px">{p.userId}</td>
                    <td width="160px">{p.mobile}</td>
                    <td width="176px">{p.department}</td>
                    <td width="176px">{p.status}</td>

                    <td width="200px">
                      <DeleteOutline className="officerListDelete" />
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

export default OfficerList;
