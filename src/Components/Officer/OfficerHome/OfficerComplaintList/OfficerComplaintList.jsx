import React, { useState, useEffect } from "react";
import axios from "../../../../axios";
import "./OfficerComplaintList.css";
function OfficerComplaintList({ complaint, officerDetails }) {
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
      console.log("done");
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
              <th> Description</th>
              <th>District</th>
              {/* <th>Proof</th> */}
              <th>Priority</th>
              <th>Assign Officer</th>
              <th>Add Comments</th>
            </tr>
            {complaints &&
              complaints.length > 0 &&
              complaints.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td width="150px">{data.registrationNo}</td>
                    <td width="150px">{data.description}</td>
                    <td width="150px">{data.area}</td>
                    {/* <td width="100px"></td> */}
                    <td width="150px">
                      <div class="priority">
                        <select onChange={(e) => setPriority(e.target.value)}>
                          <option value="High">High</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Low">Low</option>
                          {/* {department &&
                            department.length > 0 &&
                            department.map((p) => {
                              return (
                                <option value={p.registrationNo}>
                                  {p.departmentname}
                                </option>
                              );
                            })} */}
                        </select>
                      </div>
                    </td>
                    <td width="250px">
                      <div class="priority">
                        <select onChange={(e) => setOfficer(e.target.value)}>
                          {officerDetails &&
                            officerDetails.length > 0 &&
                            officerDetails.map((p) => {
                              return (
                                <option value={p._id}>{p.district}</option>
                              );
                            })}
                        </select>
                      </div>
                    </td>
                    <td width="230px">
                      <div class="input_field cmpselect_option">
                        <textarea
                          className="officer-comments"
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                    </td>
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
