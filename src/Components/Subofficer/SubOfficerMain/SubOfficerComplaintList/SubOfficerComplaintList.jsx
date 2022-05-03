import React, { useState, useEffect } from "react";
import axios from "../../../../axios";
import "./SubOfficerComplaintList.css";
import { Close } from "@material-ui/icons";
import Modal from "react-modal";
function SubOfficerComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [comments, setComments] = useState();
  const [reportComment, setReportComment] = useState();
  const [complaintStatus, setComplaintStatus] = useState();
  const [complaintPriority, setComplaintPriority] = useState();
  const customStyles = {
    content: {
      top: "45%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "650px",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openReportModal() {
    setIsReportOpen(true);
  }

  function closeReportModal() {
    setIsReportOpen(false);
  }
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalReportIsOpen, setIsReportOpen] = useState(false);

  async function getOfficerComplaints() {
    const token = localStorage.getItem("Subofficer-token");
    let response = await axios.post(`subofficer/getSubOfficerComplaint`, {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      const result = response.data.complaint.filter(
        (response) => response.status === "Pending"
      );
      setComplaints(result);
    }
  }

  async function ComplaintAction(e, id) {
    e.preventDefault();
    const data = {
      complaint_id: id,
      sub_comment: comments,
      action: complaintStatus,
    };
    let response = await axios.post(`subofficer/complaintAction`, data);
    if (response.status === 200 && response.data.verify === "success") {
      getOfficerComplaints();
      closeModal();
    }
  }

  //  <-------REPORT----------->
  async function reportAction(e, id) {
    e.preventDefault();
    const data = {
      complaint_id: id,
      sub_comment: reportComment,
      priority: complaintPriority,
    };
    let response = await axios.post(`subofficer/reportAction`, data);
    if (response.status === 200 && response.data.verify === "success") {
      getOfficerComplaints();
      closeReportModal();
    }
  }

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
              <th>Complaint Type</th>
              {/* <th>Proof</th> */}
              <th>Issue</th>
              <th>Description</th>
              <th>Bank</th>
            </tr>
            {complaints &&
              complaints.length > 0 &&
              complaints.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td width="150px">{data.registrationNo}</td>
                    <td width="150px">{data.main_complaint_type}</td>
                    <td width="150px">{data.sub_complaint_type}</td>
                    <td width="230px">{data.description}</td>
                    <td width="150px">{data.bank_name}</td>
                    <td>
                      {" "}
                      <button
                        className="officerComplaintUpdate"
                        onClick={(e) => openModal()}
                      >
                        Details
                      </button>
                      <div className="report">
                        <button
                          style={{
                            backgroundColor: "green",
                            marginTop: "10px",
                          }}
                          className="officerComplaintUpdate"
                          onClick={(e) => openReportModal()}
                        >
                          Report
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="modal-close-btn">
          <Close className="closeBtn" onClick={closeModal} />
        </div>

        <form>
          <div className="title">
            <h1>Complaint Details</h1>
          </div>
          {complaints &&
            complaints.length > 0 &&
            complaints.map((data) => {
              return (
                <div className="body">
                  <div class="datas">
                    <div class="data">
                      <table>
                        {complaints &&
                          complaints.length > 0 &&
                          complaints.map((data, index) => {
                            return (
                              <>
                                <tr>
                                  <th width="200">Complaint Id</th>
                                  <td style={{ textAlign: "left" }}>
                                    : {data.registrationNo}
                                  </td>
                                </tr>

                                <tr>
                                  <th>Complaint Type</th>
                                  <td style={{ textAlign: "left" }}>
                                    : {data.main_complaint_type}
                                  </td>
                                </tr>
                                <tr>
                                  <th>Issue</th>
                                  <td style={{ textAlign: "left" }}>
                                    : {data.sub_complaint_type}
                                  </td>
                                </tr>

                                <tr>
                                  <th>Description</th>
                                  <td style={{ textAlign: "left" }}>
                                    : {data.description}
                                  </td>
                                </tr>

                                <tr>
                                  <th>Bank</th>
                                  <td style={{ textAlign: "left" }}>
                                    : {data.bank_name}
                                  </td>
                                </tr>

                                <tr>
                                  <th>Bank Branch</th>
                                  <td style={{ textAlign: "left" }}>
                                    : {data.bank_branch}
                                  </td>
                                </tr>

                                <tr>
                                  <th>Complainee Name</th>
                                  <td style={{ textAlign: "left" }}>
                                    : {data.name}
                                  </td>
                                </tr>

                                <tr>
                                  <th>Complainee Email</th>
                                  <td style={{ textAlign: "left" }}>
                                    : {data.userEmail}
                                  </td>
                                </tr>

                                <tr>
                                  <th>Complainee Address</th>
                                  <td style={{ textAlign: "left" }}>
                                    : {data.address}
                                  </td>
                                </tr>
                                <tr>
                                  <th>Posted Date</th>
                                  <td style={{ textAlign: "left" }}>
                                    : {data.date}
                                  </td>
                                </tr>
                                <tr>
                                  <th>Add comment</th>
                                  <td style={{ textAlign: "left" }}>
                                    <div class="input_field cmpselect_option">
                                      <textarea
                                        className="officer-comments"
                                        onChange={(e) =>
                                          setComments(e.target.value)
                                        }
                                      ></textarea>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <th>Update status</th>
                                  <td>
                                    {" "}
                                    <div class="input_field cmpselect_option">
                                      <select
                                        onChange={(e) =>
                                          setComplaintStatus(e.target.value)
                                        }
                                      >
                                        <option value="Processing">
                                          Processing
                                        </option>
                                        <option value="Resolved">
                                          Resolved
                                        </option>
                                        <option value="Rejected">
                                          Rejected
                                        </option>
                                      </select>
                                      <div class="select_arrow"></div>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </table>
                      <button
                        className="officerComplaintUpdate"
                        style={{ marginTop: "25px" }}
                        onClick={(e) => ComplaintAction(e, data._id)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </form>
      </Modal>
      {/* 
      <-------Report Modal------------> */}
      <Modal
        isOpen={modalReportIsOpen}
        onRequestClose={closeReportModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="modal-close-btn">
          <Close className="closeBtn" onClick={closeReportModal} />
        </div>

        <form>
          <div className="title">
            <h1>Send Report</h1>
          </div>
          {complaints &&
            complaints.length > 0 &&
            complaints.map((data) => {
              return (
                <div className="body">
                  <div class="datas">
                    <div class="data">
                      <table>
                        {complaints &&
                          complaints.length > 0 &&
                          complaints.map((data, index) => {
                            return (
                              <>
                                <tr>
                                  <th width="200">Complaint Id</th>
                                  <td style={{ textAlign: "left" }}>
                                    : {data.registrationNo}
                                  </td>
                                </tr>

                                <tr>
                                  <th>Set Priority</th>
                                  <td>
                                    {" "}
                                    <div class="input_field cmpselect_option">
                                      <select
                                        onChange={(e) =>
                                          setComplaintPriority(e.target.value)
                                        }
                                      >
                                        <option value="High">High</option>
                                        <option value="Moderate">
                                          Moderate
                                        </option>
                                        <option value="Low">Low</option>
                                      </select>
                                      <div class="select_arrow"></div>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <th>Add comment</th>
                                  <td style={{ textAlign: "left" }}>
                                    <div class="input_field cmpselect_option">
                                      <textarea
                                        className="officer-comments"
                                        onChange={(e) =>
                                          setReportComment(e.target.value)
                                        }
                                      ></textarea>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </table>
                      <button
                        className="officerComplaintUpdate"
                        style={{ marginTop: "25px" }}
                        onClick={(e) => reportAction(e, data._id)}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </form>
      </Modal>
    </div>
  );
}

export default SubOfficerComplaintList;
