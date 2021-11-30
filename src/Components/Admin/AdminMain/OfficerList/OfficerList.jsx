import React from "react";
import "./OfficerList.css";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
function OfficerList({ officers }) {
  return (
    <div className="officerList">
      <div className="officerTitle">Officers</div>
      <div class="officerDatas">
        <div class="officerData">
          <table>
            <tr>
              <th style={{ padding: "20px" }}>Sl.No</th>
              <th>Name</th>
              <th>Registration ID</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>District</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            <tr key="1">
              <td>1.</td>
              <td width="180px">rubin</td>
              <td width="200px">12345</td>
              <td width="160px">9048317092</td>
              <td width="176px">Water Authority</td>
              <td width="176px">Kottayam</td>
              <td width="240px">Active</td>
              <td width="200px">
                <DeleteOutline className="officerListDelete" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OfficerList;
