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
              id="statusinput"
              onChange={(e) => setRegNO(e.target.value)}
              required
            />
          </div>
          <div className="status-submit">
            <input
              type="button"
              className="status-submitbtn"
              value="Check"
              id="statuscheck"
              onClick={(e) => fetchStatus(e)}
            />
          </div>
        </div>
      </div>
      <div id="statusDetails" className="statusDetails statuslist-hide">
        <div class="datas">
          <div class="data">
            <table>
              <tr>
                <th>Date of Receipt</th>
                <th>Received By Ministry/Department</th>
                <th>Grievance Description</th>
                <th>Current Status</th>
                <th>Date of Action</th>
                <th>Remarks</th>
              </tr>

              <tr>
                <td width="200px">{statusdata.date}</td>
                <td width="200px"> Financial Services (Banking Division)</td>
                <td width="200px">
                  {" "}
                  {statusdata.main_complaint_type}+
                  {statusdata.sub_complaint_type}+{statusdata.description}
                </td>
                <td width="200px">{statusdata.status}</td>
                <td width="200px">{statusdata.actiondate}</td>
                <td width="200px">{statusdata.subcomment}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintStatus;
