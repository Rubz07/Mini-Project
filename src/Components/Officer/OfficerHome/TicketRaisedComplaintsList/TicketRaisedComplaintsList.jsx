import React, { useState, useEffect } from "react";
import axios from "../../../../axios";
import { Close } from "@material-ui/icons";
import Modal from "react-modal";
function TicketRaisedComplaintsList() {
  const [TicketRaisedComplaints, setTicketRaisedComplaints] = useState([]);
  const [cmpId, setCmpId] = useState();
  const [ticketCat, setTicketCat] = useState();
  const [ticketReason, setTicketReason] = useState();
  const [ticketDate, setTicketDate] = useState();

  const [dcmpId, dsetCmpId] = useState();
  const [dticketCat, dsetTicketCat] = useState();
  const [dticketReason, dsetTicketReason] = useState();
  const [dticketDate, dsetTicketDate] = useState();
  const [cmpType, setCmpType] = useState();
  const [cmpSubType, setCmpSubType] = useState();
  const [cmpDesc, setCmpDesc] = useState();
  const [cmpBank, setCmpBank] = useState();
  const [cmpBankBranch, setCmpBankBranch] = useState();
  const [cmpStatus, setCmpStatus] = useState();

  const [reportComment, setReportComment] = useState();
  const [complaintStatus, setComplaintStatus] = useState();
  const [complaintPriority, setComplaintPriority] = useState();
  const [clarificationType, setClarificationType] = useState();
  const [clarificationRemarks, setClarificationRemarks] = useState();

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
    cmpId,
    cmpType,
    cmpSubType,
    cmpDesc,
    cmpBank,
    cmpBankBranch,
    ticketCat,
    ticketType,
    ticketDate,
    status
  ) {
    dsetCmpId(cmpId);
    dsetTicketCat(ticketCat);
    dsetTicketReason(ticketType);
    dsetTicketDate(ticketDate);
    setCmpType(cmpType);
    setCmpSubType(cmpSubType);
    setCmpDesc(cmpDesc);
    setCmpBank(cmpBank);
    setCmpBankBranch(cmpBankBranch);
    setCmpStatus(status);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openClarificationModal(cmpid, ticketCat, ticketReason, ticketDate) {
    setCmpId(cmpid);
    setTicketCat(ticketCat);
    setTicketReason(ticketReason);
    setTicketDate(ticketDate);
    setClarificationIsOpen(true);
  }

  function closeClarificationModal() {
    setClarificationIsOpen(false);
  }

  function openReportModal() {
    setIsReportOpen(true);
  }

  function closeReportModal() {
    setIsReportOpen(false);
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalClarificationIsOpen, setClarificationIsOpen] = useState(false);
  const [modalReportIsOpen, setIsReportOpen] = useState(false);

  async function getTicketRaisedComplaints() {
    const token = localStorage.getItem("officer-token");

    let response = await axios.post(`officer/getTicketRaisedComplaints`, {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setTicketRaisedComplaints(response.data.complaint);
    }
  }

  useEffect(() => {
    getTicketRaisedComplaints();
  }, []);
  return (
    <div className="manageOfficerList">
      <div className="manageOfficerTitle">Ticket Raised</div>
      <div class="manageOfficerDatas">
        <div class="manageOfficerData">
          <table>
            <tr>
              <th style={{ padding: "20px" }}>Sl.No</th>
              <th>Complaint Id</th>

              <th>Date</th>
              <th>Action</th>
            </tr>
            {TicketRaisedComplaints &&
              TicketRaisedComplaints.length > 0 &&
              TicketRaisedComplaints.map((p, index) => {
                return (
                  <tr key={TicketRaisedComplaints._id}>
                    <td>{index}</td>
                    <td width="180px">{p.registrationNo}</td>
                    <td width="200px">{p.ticket_raised_category}</td>
                    <td width="160px">{p.ticket_raised_reason}</td>
                    <td width="176px">{p.ticket_raised_date}</td>
                    <td>
                      {" "}
                      <button
                        className="officerComplaintUpdate"
                        onClick={(e) =>
                          openModal(
                            p.registrationNo,
                            p.main_complaint_type,
                            p.sub_complaint_type,
                            p.description,
                            p.bank_name,
                            p.bank_branch,
                            p.ticket_raised_category,
                            p.ticket_raised_reason,
                            p.ticket_raised_date,
                            p.status
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
                              p.registrationNo,
                              p.ticket_raised_category,
                              p.ticket_raised_reason,
                              p.ticket_raised_date
                            )
                          }
                        >
                          Clarification
                        </button>
                      </div>
                      {/* <button
                        style={{
                          backgroundColor: "rgb(255, 99, 113)",
                          marginTop: "10px",
                        }}
                        className="officerComplaintUpdate"
                        // onClick={(e) => openModal()}
                      >
                        Took Action
                      </button> */}
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
                      <td style={{ textAlign: "left" }}>
                        : {dcmpId}
                      </td>
                    </tr>

                    <tr>
                      <th>Complaint Type</th>
                      <td style={{ textAlign: "left" }}>
                        : {cmpType}
                      </td>
                    </tr>
                    <tr>
                      <th>Issue</th>
                      <td style={{ textAlign: "left" }}>
                        : {cmpSubType}
                      </td>
                    </tr>

                    <tr>
                      <th>Description</th>
                      <td style={{ textAlign: "left" }}>
                        : {cmpDesc}
                      </td>
                    </tr>

                    <tr>
                      <th>Bank</th>
                      <td style={{ textAlign: "left" }}>: {cmpBank}</td>
                    </tr>

                    <tr>
                      <th>Bank Branch</th>
                      <td style={{ textAlign: "left" }}>
                        : {cmpBankBranch}
                      </td>
                    </tr>

                    <tr>
                      <th>Ticket Type</th>
                      <td style={{ textAlign: "left" }}>
                        : {dticketCat}
                      </td>
                    </tr>

                    <tr>
                      <th>Ticket Reason</th>
                      <td style={{ textAlign: "left" }}>
                        : {dticketReason}
                      </td>
                    </tr>

                    <tr>
                      <th>Ticket Raised Date</th>
                      <td style={{ textAlign: "left" }}>
                        : {dticketDate}
                      </td>
                    </tr>

                    <tr>
                      <th>Current Status</th>
                      <td style={{ textAlign: "left" }}>: {cmpStatus}</td>
                    </tr>
                    {/* <tr>
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
                                </tr> */}

                    {/* <tr>
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
                                </tr> */}
                  </>
                </table>
                {/* <button
                        className="officerComplaintUpdate"
                        style={{ marginTop: "25px" }}
                        // onClick={(e) => ComplaintAction(e, data._id)}
                      >
                        Update
                      </button> */}
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
          {TicketRaisedComplaints &&
            TicketRaisedComplaints.length > 0 &&
            TicketRaisedComplaints.map((data) => {
              return (
                <div className="body">
                  <div class="datas">
                    <div class="data">
                      <table>
                        {TicketRaisedComplaints &&
                          TicketRaisedComplaints.length > 0 &&
                          TicketRaisedComplaints.map((data, index) => {
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
                        // onClick={(e) => reportAction(e, data._id)}
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
                      <td style={{ textAlign: "left" }}>: {cmpId}</td>
                    </tr>

                    <tr>
                      <th width="200">Ticket Type</th>
                      <td style={{ textAlign: "left" }}>: {ticketCat}</td>
                    </tr>

                    <tr>
                      <th width="200">Ticket Reason</th>
                      <td style={{ textAlign: "left" }}>: {ticketReason}</td>
                    </tr>

                    <tr>
                      <th width="200">Ticket Date</th>
                      <td style={{ textAlign: "left" }}>: {ticketDate}</td>
                    </tr>
                  </>
                </table>
                <button
                  className="officerComplaintUpdate"
                  style={{ marginTop: "25px" }}
                  // onClick={(e) => clarificationAction(e, data._id)}
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

export default TicketRaisedComplaintsList;
