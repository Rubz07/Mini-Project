import React, { useState, useEffect } from "react";
import axios from "../../../../axios";
import "./OfficerComplaintList.css";
function OfficerComplaintList({ officerDetails }) {
  const [priority, setPriority] = useState();
  const [officer, setOfficer] = useState();
  const [comment, setComment] = useState();
  const [complaints, setComplaints] = useState([]);

  async function getOfficerComplaints() {
    const token = localStorage.getItem("officer-token");

    let response = await axios.post(`officer/getOfficerComplaint`, {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      console.log(response.data.complaint);
      // const result = response.data.complaint.filter(
      //   (response) => response.status === "Reported"
      // );
      setComplaints(response.data.complaint);
    }
  }

  const handleComplaint = async (e, id) => {
    console.log(id);
    const data = {
      status: "Assigned",
      complaintRegistrationID: id,
      priority: priority,
      officer: officer,
      comment: comment,
    };

    const res = await axios.post("officer/assigncomplaint", data);
    if (res.status === 200 && res.data.verify === "success") {
      getOfficerComplaints();
    } else {
      alert("Some error occured");
    }
  };

  useEffect(() => {
    getOfficerComplaints();
  }, []);
  return (
    <div className="complaintDetails">
      <div className="complaintTitle">Complaints</div>

      <div class="datas">
        <div class="data">
          <table>
            <tr>
              <th>Complaint Id</th>
              <th>Priority</th>
              <th>Complaint Type</th>
              <th>Issue</th>
              <th>Officer Comment</th>
              <th>Date</th>
            </tr>
            {complaints &&
              complaints.length > 0 &&
              complaints.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td width="150px">{data.registrationNo}</td>
                    <td width="150px">{data.priority}</td>
                    <td width="150px">{data.main_complaint_type}</td>
                    <td width="150px">{data.sub_complaint_type}</td>
                    {/* <td width="100px"></td> */}

                    <td width="230px">
                      <div class="input_field cmpselect_option">
                        <textarea className="officer-comments" disabled>
                          {data.comment}
                        </textarea>
                      </div>
                    </td>
                    <td width="150px">{data.actiondate}</td>
                    <td>
                      {" "}
                      <button
                        className="officerComplaintUpdate"
                        onClick={(e) => handleComplaint(e, data.registrationNo)}
                      >
                        Update
                      </button>
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

export default OfficerComplaintList;
