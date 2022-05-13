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
  const [clarificationType, setClarificationType] = useState();
  const [clarificationRemarks, setClarificationRemarks] = useState();

  const [cmpId, setCmpId] = useState();
  const [Id, setId] = useState();
  const [Date, setDate] = useState();
  const [cmpType, setCmpType] = useState();
  const [cmpSubType, setCmpSubType] = useState();
  const [cmpDesc, setCmpDesc] = useState();
  const [cmpBank, setCmpBank] = useState();
  const [cmpBankBranch, setCmpBankBranch] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userAddress, setUserAddress] = useState();

  const [cCmpid, setCcmpid] = useState();
  const [cRegno, setCregno] = useState();

  const [rId, setRid] = useState();
  const [rRegno, setRregno] = useState();

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
  function openModal(
    id,
    cmpId,
    cmpType,
    cmpSubType,
    cmpDesc,
    cmpBank,
    cmpBankBranch,
    userName,
    userEmail,
    userAddrs,
    date
  ) {
    setId(id);
    setCmpId(cmpId);
    setDate(Date);
    setCmpType(cmpType);
    setCmpSubType(cmpSubType);
    setCmpDesc(cmpDesc);
    setCmpBank(cmpBank);
    setCmpBankBranch(cmpBankBranch);
    setUserName(userName);
    setUserEmail(userEmail);
    setUserAddress(userAddrs);
    setDate(date);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openClarificationModal(id, regno) {
    setCcmpid(id);
    setCregno(regno);
    setClarificationIsOpen(true);
  }

  function closeClarificationModal() {
    setClarificationIsOpen(false);
  }

  function openReportModal(id, regno) {
    setRid(id);
    setRregno(regno);
    setIsReportOpen(true);
  }

  function closeReportModal() {
    setIsReportOpen(false);
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalClarificationIsOpen, setClarificationIsOpen] = useState(false);
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
      alert("Complaint Reported Successfully");
      getOfficerComplaints();
      closeReportModal();
    }
  }

  //  <-------CLARIFICATION----------->
  async function clarificationAction(e, id) {
    e.preventDefault();
    const data = {
      complaint_id: id,
      clarification_type: clarificationType,
      clarification_remark: clarificationRemarks,
    };
    let response = await axios.post(`subofficer/clarificationAction`, data);
    if (response.status === 200 && response.data.verify === "success") {
      getOfficerComplaints();
      closeClarificationModal();
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
              <th>Action</th>
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
                        onClick={(e) =>
                          openModal(
                            data._id,
                            data.registrationNo,
                            data.main_complaint_type,
                            data.sub_complaint_type,
                            data.description,
                            data.bank_name,
                            data.bank_branch,
                            data.name,
                            data.userEmail,
                            data.address,
                            data.date
                          )
                        }
                      >
                        Details
                      </button>
                      <div className="report">
                        <button
                          style={{
                            backgroundColor: "#289cc9",
                            marginTop: "10px",
                          }}
                          className="officerComplaintUpdate"
                          onClick={(e) =>
                            openClarificationModal(
                              data._id,
                              data.registrationNo
                            )
                          }
                        >
                          Clarification
                        </button>
                      </div>
                      <div className="report">
                        <button
                          style={{
                            backgroundColor: "rgb(255, 99, 113)",
                            marginTop: "10px",
                          }}
                          className="officerComplaintUpdate"
                          onClick={(e) =>
                            openReportModal(data._id, data.registrationNo)
                          }
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

          <div className="body">
            <div class="datas">
              <div class="data">
                <table>
                  <>
                    <tr>
                      <th width="200">Complaint Id</th>
                      <td style={{ textAlign: "left" }}>: {cmpId}</td>
                    </tr>

                    <tr>
                      <th>Complaint Type</th>
                      <td style={{ textAlign: "left" }}>: {cmpType}</td>
                    </tr>
                    <tr>
                      <th>Issue</th>
                      <td style={{ textAlign: "left" }}>: {cmpSubType}</td>
                    </tr>

                    <tr>
                      <th>Description</th>
                      <td style={{ textAlign: "left" }}>: {cmpDesc}</td>
                    </tr>

                    <tr>
                      <th>Bank</th>
                      <td style={{ textAlign: "left" }}>: {cmpBank}</td>
                    </tr>

                    <tr>
                      <th>Bank Branch</th>
                      <td style={{ textAlign: "left" }}>: {cmpBankBranch}</td>
                    </tr>

                    <tr>
                      <th>Complainee Name</th>
                      <td style={{ textAlign: "left" }}>: {userName}</td>
                    </tr>

                    <tr>
                      <th>Complainee Email</th>
                      <td style={{ textAlign: "left" }}>: {userEmail}</td>
                    </tr>

                    <tr>
                      <th>Complainee Address</th>
                      <td style={{ textAlign: "left" }}>: {userAddress}</td>
                    </tr>
                    <tr>
                      <th>Posted Date</th>
                      <td style={{ textAlign: "left" }}>: {Date}</td>
                    </tr>
                    <tr>
                      <th>Add comment</th>
                      <td style={{ textAlign: "left" }}>
                        <div class="input_field cmpselect_option">
                          <textarea
                            className="officer-comments"
                            onChange={(e) => setComments(e.target.value)}
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
                            onChange={(e) => setComplaintStatus(e.target.value)}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <div class="select_arrow"></div>
                        </div>
                      </td>
                    </tr>
                  </>
                </table>
                <button
                  className="officerComplaintUpdate"
                  style={{ marginTop: "25px" }}
                  onClick={(e) => ComplaintAction(e, Id)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
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

          <div className="body">
            <div class="datas">
              <div class="data">
                <table>
                  <>
                    <tr>
                      <th width="200">Complaint Id</th>
                      <td style={{ textAlign: "left" }}>: {rRegno}</td>
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
                            <option value="Moderate">Moderate</option>
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
                            onChange={(e) => setReportComment(e.target.value)}
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                  </>
                </table>
                <button
                  className="officerComplaintUpdate"
                  style={{ marginTop: "25px" }}
                  onClick={(e) => reportAction(e, rId)}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      {/* 
    <-------Clarification Modal------------> */}
      <Modal
        isOpen={modalClarificationIsOpen}
        onRequestClose={closeClarificationModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="modal-close-btn">
          <Close className="closeBtn" onClick={closeClarificationModal} />
        </div>

        <form>
          <div className="title">
            <h1>Ask Clarification</h1>
          </div>

          <div className="body">
            <div class="datas">
              <div class="data">
                <table>
                  <>
                    <tr>
                      <th width="200">Complaint Id</th>
                      <td style={{ textAlign: "left" }}>: {cRegno}</td>
                    </tr>

                    <tr>
                      <th>Clarification Type</th>
                      <td>
                        {" "}
                        <div class="input_field cmpselect_option">
                          <select
                            onChange={(e) =>
                              setClarificationType(e.target.value)
                            }
                          >
                            <option value=""></option>
                            <option value="Insufficient information">
                              Insufficient information
                            </option>
                          </select>
                          <div class="select_arrow"></div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th>Remarks</th>
                      <td style={{ textAlign: "left" }}>
                        <div class="input_field cmpselect_option">
                          <textarea
                            className="officer-comments"
                            onChange={(e) =>
                              setClarificationRemarks(e.target.value)
                            }
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                  </>
                </table>
                <button
                  className="officerComplaintUpdate"
                  style={{ marginTop: "25px" }}
                  onClick={(e) => clarificationAction(e, cCmpid)}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default SubOfficerComplaintList;
