import React, { useState, useEffect } from "react";
import axios from "../../../../axios";
import "./SubOfficerComplaintList.css";
import { Close } from "@material-ui/icons";
import Modal from "react-modal";
function SubOfficerComplaintList() {
  const [complaints, setComplaints] = useState([]);

  const customStyles = {
    content: {
      top: "45%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "600px",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [modalIsOpen, setIsOpen] = useState(false);

  async function getOfficerComplaints() {
    const token = localStorage.getItem("Subofficer-token");
    let response = await axios.post(`subofficer/getSubOfficerComplaint`, {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setComplaints(response.data.complaint);
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
              <th> Description</th>
              {/* <th>Proof</th> */}
              <th>Priority</th>
              <th>Comments</th>
              <th>Type</th>
            </tr>
            {complaints &&
              complaints.length > 0 &&
              complaints.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td width="150px">{data.registrationNo}</td>
                    <td width="150px">{data.description}</td>
                    <td width="150px">{data.priority}</td>
                    <td width="230px">{data.comment}</td>
                    <td width="150px">{data.complaint_type}</td>
                    <td>
                      {" "}
                      <button
                        className="officerComplaintUpdate"
                        onClick={(e) => openModal()}
                      >
                        Details
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
                                  <th>Complaint Id</th>
                                  <td>: {data.registrationNo}</td>
                                </tr>

                                <tr>
                                  <th>User Name</th>
                                  <td>: {data.name}</td>
                                </tr>
                                <tr>
                                  <th>User Number</th>
                                  <td>: {data.userContac}</td>
                                </tr>

                                <tr>
                                  <th>Description</th>
                                  <td>: {data.description}</td>
                                </tr>

                                <tr>
                                  <th>Complaint Type</th>
                                  <td>: {data.complaint_type}</td>
                                </tr>

                                <tr>
                                  <th>Panchayat</th>
                                  <td>: {data.panchayat}</td>
                                </tr>
                                <tr>
                                  <th>Posted Date</th>
                                  <td>: {data.date}</td>
                                </tr>
                                <tr>
                                  <th>Add comment</th>
                                  <td>
                                    <div class="input_field cmpselect_option">
                                      <textarea
                                        className="officer-comments"
                                        //   onChange={(e) => setComment(e.target.value)}
                                      ></textarea>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <th>Update status</th>
                                  <td>
                                    {" "}
                                    <div class="input_field cmpselect_option">
                                      <select>
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
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="footer">
            {/* <Link to="/Officerdashboard">
              <button>Continue</button>
            </Link> */}
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default SubOfficerComplaintList;
