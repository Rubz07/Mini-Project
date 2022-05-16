import React, { useState, useEffect } from "react";
import axios from "../../../../axios";
import "./EscalatedComplaints.css";
import { Close } from "@material-ui/icons";
import Modal from "react-modal";
function EscalatedComplaints() {
  const [excalatedComplaints, setEscalatedComplaints] = useState([]);

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
    setIsOpen(true);
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
              <th>Officer Remark</th>
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
                          openModal()
                          // p.registrationNo,
                          // p.main_complaint_type,
                          // p.sub_complaint_type,
                          // p.description,
                          // p.bank_name,
                          // p.bank_branch,
                          // p.ticket_raised_category,
                          // p.ticket_raised_reason,
                          // p.ticket_raised_date,
                          // p.status
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
            <h1>Complaint Details</h1>
          </div>
          <div className="body">
            <div class="datas">
              <div class="data">
                <table>
                  <>
                    <tr>
                      <th width="200">Complaint Id</th>
                      <td style={{ textAlign: "left" }}>: </td>
                    </tr>

                    <tr>
                      <th>Complaint Type</th>
                      <td style={{ textAlign: "left" }}>: </td>
                    </tr>
                    <tr>
                      <th>Issue</th>
                      <td style={{ textAlign: "left" }}>: </td>
                    </tr>

                    <tr>
                      <th>Description</th>
                      <td style={{ textAlign: "left" }}>: </td>
                    </tr>

                    <tr>
                      <th>Bank</th>
                      <td style={{ textAlign: "left" }}>: </td>
                    </tr>

                    <tr>
                      <th>Bank Branch</th>
                      <td style={{ textAlign: "left" }}>: </td>
                    </tr>

                    <tr>
                      <th>Ticket Type</th>
                      <td style={{ textAlign: "left" }}>: </td>
                    </tr>

                    <tr>
                      <th>Ticket Reason</th>
                      <td style={{ textAlign: "left" }}>: </td>
                    </tr>

                    <tr>
                      <th>Ticket Raised Date</th>
                      <td style={{ textAlign: "left" }}>: </td>
                    </tr>

                    <tr>
                      <th>Current Status</th>
                      <td style={{ textAlign: "left" }}>: </td>
                    </tr>
                  </>
                </table>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EscalatedComplaints;
