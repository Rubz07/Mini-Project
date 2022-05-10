import React, { useState, useEffect } from "react";
import "./ComplaintData.css";
import axios from "../../../../axios";
import Modal from "react-modal";
import { DeleteOutline, Edit, Close } from "@material-ui/icons";
function ComplaintData() {
  const [complaintdata, setComplaintData] = useState();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "600px",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  //const [updateModal, setUpdateMoldal] = useState(false);

  function openComplaintModal() {
    setIsOpen(true);
  }

  function closeComplaintModal() {
    setIsOpen(false);
  }

  const handleSubmit = async () => {
    const data = {
      name: complaintdata,
    };
    const response = await axios.post("admin/create-ComplaintData", data);

    if (response.data.status === true) {
      //   getDepartments();
      setIsOpen(false);
    } else {
      //   setErrorMessage(response.data.message);
      //   departmentErr.classList.remove("departmentErr-hidden");
    }
  };
  return (
    <div className="complaintDataList">
      <div className="complaintDataMain-header">
        <div className="complaintDataTitle">Complaint Data</div>
        <div className="complaintDataHandleButton">
          <div className="createcomplaintData">
            <button className="complaintAddButton" onClick={openComplaintModal}>
              Complaint
            </button>
          </div>

          <div className="createcomplaintData">
            <button
              className="bankAddButton"
              //    onClick={openModal}
            >
              Bank
            </button>
          </div>
        </div>
      </div>

      <div class="complaintDataDatas">
        <div class="complaintDataData">
          <table>
            <tr>
              <th style={{ padding: "20px" }}>Sl.No</th>
              <th>Complaints</th>
              <th>Banks</th>
            </tr>
            {/* {complaintData &&
              complaintData.length > 0 &&
              complaintData.map((p, index) => {
                return ( */}
            <tr>
              <td></td>
              <td width="280px">adsd</td>
              <td width="200px">safas</td>

              {/* <td width="200px">
                <Edit
                  className="editDep"
                  // onClick={(e) =>  openUpdateModal(p._id, p.complaintDataname)}
                />

                <DeleteOutline
                  className="complaintDataListDelete"
                  // onClick={(e) => removecomplaintData(e, p._id)}
                />
              </td> */}
            </tr>
            {/* );
              })} */}
          </table>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeComplaintModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="dep-header">
          <div className="departmentform-title">Create Complaint</div>
          <div class="modal-close-btn">
            <Close className="closeBtn" onClick={closeComplaintModal} />
          </div>
        </div>

        <form>
          <div className="department-details">
            <div className="departmentinput-box">
              <span className="departmentDetails">Complaint</span>
              <input
                type="text"
                className="department-input"
                placeholder="Enter Complaint"
                onChange={(e) => setComplaintData(e.target.value)}
                required
              />
            </div>
            <div className="bttn">
              <input
                type="button"
                className="department-submit"
                value="Create"
                // onClick={handleSubmit}
              />
            </div>
          </div>
          <div className="departmentErr departmentErr-hidden ">
            {/* <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p> */}
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ComplaintData;
