import React, { useState, useEffect } from "react";
import "./ManageSubOfficers.css";
import { DeleteOutline } from "@material-ui/icons";
import CheckIcon from "@material-ui/icons/Check";
import axios from "../../../../axios";
import { Link } from "react-router-dom";
function ManageSubOfficers() {
  const [officer, setOfficer] = useState(null);

  async function getOfficers() {
    let response = await axios.get(`officer/manageOfficers`);
    if (response.status === 200) {
      setOfficer(response.data.officer);
    }
  }

  async function blockOfficer(id) {
    console.log(id);
    const data = {
      officer_id: id,
    };
    let response = await axios.post(`officer/block-officer`, data);
    if (response.status === 200) {
      getOfficers();
    } else {
      alert("some error occured");
    }
  }

  async function unBlockOfficer(id) {
    console.log(id);
    const data = {
      officer_id: id,
    };
    let response = await axios.post(`officer/unblock-officer`, data);
    if (response.status === 200) {
      getOfficers();
    } else {
      alert("some error occured");
    }
  }

  useEffect(() => {
    getOfficers();
  }, []);
  return (
    <div className="manageOfficerList">
      <div className="manageOfficerTitle">Officers</div>
      <div class="manageOfficerDatas">
        <div class="manageOfficerData">
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

                    <td width="10px">
                      <DeleteOutline
                        className="manageOfficerListDelete"
                        onClick={(e) => blockOfficer(p._id)}
                      />
                    </td>
                    <td width="10px">
                      <CheckIcon
                        className="manageOfficerListUnblock"
                        onClick={(e) => unBlockOfficer(p._id)}
                      />
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

export default ManageSubOfficers;
