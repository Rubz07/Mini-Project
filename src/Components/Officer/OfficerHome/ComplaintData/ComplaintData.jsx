import React, { useState, useEffect } from "react";
import "./ComplaintData.css";
import axios from "../../../../axios";
import Modal from "react-modal";
import { DeleteOutline, Edit, Close } from "@material-ui/icons";
function ComplaintData() {
  const [complaintData, setComplaintData] = useState();
  const [complaintDatas, setComplaintDatas] = useState();
  const [bankData, setBankData] = useState();
  const [bank, setBank] = useState();

  const [subComplaintData, setSubComplaintData] = useState();
  const complaintErr = document.querySelector(".complaintErr");
  const bankErr = document.querySelector(".bankErr");

  const [errorMessage, setErrorMessage] = useState();
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
  const [bankModal, setBankMoldal] = useState(false);

  function openComplaintModal() {
    setIsOpen(true);
  }

  function closeComplaintModal() {
    setIsOpen(false);
  }

  function openBankModal() {
    setBankMoldal(true);
  }

  function closeBankModal() {
    setBankMoldal(false);
  }

  async function getComplaintData() {
    let response = await axios.get(`officer/getComplaintData`);
    if (response.status === 200) {
      setComplaintDatas(response.data.complaintData);
    }
  }

  async function getBankData() {
    let response = await axios.get(`officer/getBankData`);
    if (response.status === 200) {
      setBankData(response.data.bankData);
    }
  }

  useEffect(() => {
    getComplaintData();
    getBankData();
  }, []);

  const handleSubmit = async () => {
    const data = {
      main_complaint: complaintData,
      sub_complaint: subComplaintData,
    };
    const response = await axios.post("officer/create-ComplaintData", data);

    if (response.data.status === true) {
      getComplaintData();
      setIsOpen(false);
    } else {
      setErrorMessage(response.data.message);
      complaintErr.classList.remove("complaintDataErr-hidden");
    }
  };

  const handleBankSubmit = async () => {
    const data = {
      bank_name: bank,
    };
    const response = await axios.post("officer/create-bank", data);
    if (response.data.status === true) {
      getBankData();
      setBankMoldal(false);
    } else {
      setErrorMessage(response.data.message);
      bankErr.classList.remove("bankErr-hidden");
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
            <button className="bankAddButton" onClick={openBankModal}>
              Bank
            </button>
          </div>
        </div>
      </div>

      <div class="complaintDataDatas">
        <div class="complaintDataData">
          <table>
            <tr>
              <th>Complaints</th>
            </tr>
            {complaintDatas &&
              complaintDatas.length > 0 &&
              complaintDatas.map((p, index) => {
                return (
                  <tr>
                    <td style={{ textAlign: "left" }}>{p.main_complaint}</td>

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
                );
              })}
          </table>
        </div>
      </div>

      <div class="complaintDataDatas">
        <div class="complaintDataData">
          <table>
            <tr>
              <th>Banks</th>
            </tr>
            {bankData &&
              bankData.length > 0 &&
              bankData.map((p, index) => {
                return (
                  <tr style={{ marginLeft: "300px" }}>
                    <td style={{ textAlign: "left" }}>{p.bank_name}</td>

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
                );
              })}
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
            <div className="departmentinput-box">
              <span className="departmentDetails">Sub Complaint</span>
              <input
                type="text"
                className="department-input"
                placeholder="Enter Complaint"
                onChange={(e) => setSubComplaintData(e.target.value)}
                required
              />
            </div>
            <div className="bttn">
              <input
                type="button"
                className="department-submit"
                value="Create"
                onClick={handleSubmit}
              />
            </div>
          </div>
          <div className="complaintErr complaintDataErr-hidden">
            <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
          </div>
        </form>
      </Modal>

      {/* <------BANK MODAL--------> */}

      <Modal
        isOpen={bankModal}
        onRequestClose={closeBankModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="dep-header">
          <div className="departmentform-title">Create Bank</div>
          <div class="modal-close-btn">
            <Close className="closeBtn" onClick={closeBankModal} />
          </div>
        </div>

        <form>
          <div className="department-details">
            <div className="departmentinput-box">
              <span className="departmentDetails">Bank</span>
              <input
                type="text"
                className="department-input"
                placeholder="Enter Bank Name"
                onChange={(e) => setBank(e.target.value)}
                required
              />
            </div>

            <div className="bttn">
              <input
                type="button"
                className="department-submit"
                value="Create"
                onClick={handleBankSubmit}
              />
            </div>
          </div>
          <div className="bankErr bankErr-hidden ">
            <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ComplaintData;
