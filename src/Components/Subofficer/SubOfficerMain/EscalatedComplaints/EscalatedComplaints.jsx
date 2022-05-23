import React, { useState, useEffect } from "react";
import axios from "../../../../axios";
import "./EscalatedComplaints.css";
import { Close } from "@material-ui/icons";
import Modal from "react-modal";
function EscalatedComplaints() {
  const [excalatedComplaints, setEscalatedComplaints] = useState([]);

  const [explanation, setExplanation] = useState();

  const [cmpObjId, setCmpObjId] = useState();
  const [cmpId, setCmpId] = useState();
  const [ticketCat, setTicketCat] = useState();
  const [ticketReason, setTicketReason] = useState();
  const [clarificationRemark, setClarificationRemark] = useState();
  const [clarificationdate, setClarificationDate] = useState();
  const [ticketDate, setTicketDate] = useState();

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
    ticketCat,
    ticketReason,
    clarificationRemark,
    clarificationDate,
    ticketdate
  ) {
    setIsOpen(true);
    setCmpObjId(id)
    setCmpId(cmpId);
    setTicketCat(ticketCat);
    setTicketReason(ticketReason);
    setClarificationRemark(clarificationRemark);
    setClarificationDate(clarificationDate);
    setTicketDate(ticketdate);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [modalIsOpen, setIsOpen] = useState(false);

  async function getEscalatedComplaints() {
    const token = localStorage.getItem("Subofficer-token");

    let response = await axios.post(`subofficer/getEscalatedComplaints`, {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setEscalatedComplaints(response.data.complaint);
    }
  }

  async function clarificationAction(e, id) {
    e.preventDefault();
    const data = {
      cmpID: id,
      explanation: explanation,
    };
    let response = await axios.post(`subofficer/ExplanationAction`, data);
    if (response.status === 200 && response.data.verify === "success") {
      alert("Success");
      closeModal();
    }
  }

  useEffect(() => {
    getEscalatedComplaints();
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
              <th>Ticket Type</th>
              <th>Clarification Remark</th>
              <th>Clarification Date</th>
              <th>Action</th>
            </tr>
            {excalatedComplaints &&
              excalatedComplaints.length > 0 &&
              excalatedComplaints.map((p, index) => {
                return (
                  <tr key={excalatedComplaints._id}>
                    <td>{index}</td>
                    <td width="180px">{p.complaint_regNo}</td>
                    <td width="200px">{p.ticket_category}</td>
                    <td width="160px">{p.clarification_remark}</td>
                    <td width="176px">{p.clarification_ask_date}</td>
                    <td>
                      {" "}
                      <button
                        className="officerComplaintUpdate"
                        onClick={(e) =>
                          openModal(
                            p._id,
                            p.complaint_regNo,
                            p.ticket_category,
                            p.ticket_reason,
                            p.clarification_remark,
                            p.clarification_ask_date,
                            p.ticket_raised_date
                          )
                        }
                      >
                        Explanation
                      </button>
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
            <h1>Ticket Details</h1>
          </div>
          <div className="body">
            <div class="datas">
              <div class="data">
                <table>
                  <>
                    <tr>
                      <th width="200">Complaint Id</th>
                      <td style={{ textAlign: "left" }}>: {cmpId} </td>
                    </tr>

                    <tr>
                      <th>Ticket Type</th>
                      <td style={{ textAlign: "left" }}>: {ticketCat} </td>
                    </tr>
                    <tr>
                      <th>Ticket Reason</th>
                      <td style={{ textAlign: "left" }}>: {ticketReason} </td>
                    </tr>

                    <tr>
                      <th>Clarification Remark</th>
                      <td style={{ textAlign: "left" }}>
                        : {clarificationRemark}{" "}
                      </td>
                    </tr>

                    <tr>
                      <th>Clarification Date</th>
                      <td style={{ textAlign: "left" }}>
                        : {clarificationdate}{" "}
                      </td>
                    </tr>

                    <tr>
                      <th>Ticket Raised Date</th>
                      <td style={{ textAlign: "left" }}>: {ticketDate} </td>
                    </tr>
                    <tr>
                      <th>Explanation</th>
                      <td style={{ textAlign: "left" }}>
                        <div class="input_field cmpselect_option">
                          <textarea
                            className="officer-comments"
                            onChange={(e) => setExplanation(e.target.value)}
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                  </>
                </table>
                <button
                  className="officerComplaintUpdate"
                  style={{ marginTop: "25px" }}
                  onClick={(e) => clarificationAction(e, cmpObjId)}
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

export default EscalatedComplaints;
