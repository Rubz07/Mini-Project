import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "../../../../axios";

import { Link } from "react-router-dom";
import { Close } from "@material-ui/icons";
import "./ComplaintList.css";

function ComplaintList({ complaint }) {
  const [ticketReason, setTicketReason] = useState();
  const [cmpRegNo, setCmpRegNO] = useState();
  const [cmpId, setCmpID] = useState();
  const [specifyTicketReason, setSpecifyTicketReason] = useState();

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
  function openReportModal(regNo, cmpId) {
    setCmpRegNO(regNo);
    setCmpID(cmpId);
    setIsReportOpen(true);
  }

  function closeReportModal() {
    setIsReportOpen(false);
  }
  const [modalReportIsOpen, setIsReportOpen] = useState(false);

  async function ticketAction(e, id) {
    e.preventDefault();
    const data = {
      complaint_id: id,
      ticketCategory: ticketReason,
      ticketRaisedReason: specifyTicketReason,
    };
    let response = await axios.post(`/ticketAction`, data);
    if (response.status === 200 && response.data.verify === "success") {
      alert("Your Ticket Successfully Raised");
      closeReportModal();
    }
  }
  return (
    <div className="complaintDetails">
      <div className="complaintTitle">Complaints</div>

      <div class="datas">
        <div class="data">
          <table>
            <tr>
              <th style={{ padding: "20px" }}>Sl.No</th>
              <th>Registration Id</th>
              <th>Department</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Raise Ticket</th>
            </tr>
            {complaint &&
              complaint.length > 0 &&
              complaint.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td width="200px">{index}</td>
                    <td width="200px">{data.registrationNo}</td>
                    <td width="200px">{data.department}</td>
                    <td width="200px">{data.description}</td>
                    <td width="200px">{data.date}</td>
                    <td width="200px">{data.status}</td>
                    <td>
                      <div className="report">
                        <button
                          style={{
                            backgroundColor: "#ff6371",
                            marginTop: "10px",
                          }}
                          className="officerComplaintUpdate"
                          onClick={(e) =>
                            openReportModal(data.registrationNo,data._id )
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
                  <tr>
                    <th width="200">Complaint Id</th>
                    <td style={{ textAlign: "left" }}>: {cmpRegNo}</td>
                  </tr>

                  <tr>
                    <th>Select Reason</th>
                    <td>
                      {" "}
                      <div class="input_field cmpselect_option">
                        <select
                          onChange={(e) => setTicketReason(e.target.value)}
                        >
                          <option value="Complaint not resolved yet">
                            Complaint not resolved yet
                          </option>
                          <option value="Issue with the  complaint action">
                            Issue with the complaint action
                          </option>
                          <option value="Give further Clarification">
                            Give further Clarification
                          </option>
                          <option value="Other">Other</option>
                        </select>
                        <div class="select_arrow"></div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th>Specify Reason</th>
                    <td style={{ textAlign: "left" }}>
                      <div class="input_field cmpselect_option">
                        <textarea
                          className="officer-comments"
                          onChange={(e) =>
                            setSpecifyTicketReason(e.target.value)
                          }
                        ></textarea>
                      </div>
                    </td>
                  </tr>
                </table>
                <button
                  className="officerComplaintUpdate"
                  style={{ marginTop: "25px" }}
                  onClick={(e) => ticketAction(e, cmpId)}
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

export default ComplaintList;
