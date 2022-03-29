import React, { useState } from "react";
import axios from "../../../../axios";
import "./ComplaintStatus.css";
function ComplaintStatus() {
  const statusdetail = document.querySelector(".statusDetails");

  const [regno, setRegNO] = useState();
  const [statusdata, setStatus] = useState({});
  const [officerdata, setOfficerdata] = useState({});

  const fetchStatus = async (e) => {
    e.preventDefault();
    const res = await axios.get("/getstatus/" + regno);
    if (res.status === 200) {
      setOfficerdata(res.data.statusdetails.officer);
      setStatus(res.data.statusdetails);
      statusdetail.classList.remove("statuslist-hide");
    }
  };

  return (
    <div className="status-main">
      <div class="status-container">
        <div class="status-content">
          <div className="statusinput-box">
            <span className="status-details">Registration No</span>
            <input
              type="text"
              className="status-input"
              onChange={(e) => setRegNO(e.target.value)}
              required
            />
          </div>
          <div className="status-submit">
            <input
              type="button"
              className="status-submitbtn"
              value="Check"
              onClick={(e) => fetchStatus(e)}
            />
          </div>
        </div>
      </div>
      <div className="statusDetails statuslist-hide">
        <div class="datas">
          <div class="data">
            <table>
              <tr>
                <th style={{ padding: "20px" }}>Complaint ID</th>
                <th>Status</th>
                <th>Department</th>
                <th>Officer</th>
                <th>Comments</th>
                <th>Action Date</th>
              </tr>

              <tr>
                <td width="200px">{statusdata.registrationNo}</td>
                <td width="200px"> {statusdata.status}</td>
                <td width="200px"> {statusdata.department}</td>
                <td width="200px">{officerdata.name}</td>
                <td width="200px">{statusdata.subcomment}</td>
                <td width="200px">{statusdata.actiondate}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintStatus;
