import React, { useState, useEffect } from "react";
import axios from "../../../../axios";
import { DeleteOutline, Close } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./AddOfficer.css";
import Modal from "react-modal";
function AddOfficer() {
  const officerErr = document.querySelector(".officerErr");
  const [department, setDepartmentList] = useState(null);
  const [depId, setDipId] = useState(null);
  const [name, setName] = useState(null);
  const [mobile, setMobile] = useState(null);

  function handleChange(e) {
    setDipId(e.target.value);
  }
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
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  async function handleofficer() {
    const data = {
      department_id: depId,
      name: name,
      mobile: mobile,
    };
    let response = await axios.post(`admin/add-officer`, data);
    if (response.status === 200 && response.data.verify === "Approved") {
      officerErr.classList.add("err-hidden");
      openModal();
    } else {
      officerErr.classList.remove("err-hidden");
    }
  }

  async function getDepartments() {
    let response = await axios.get(`admin/get-departments`);
    if (response.status === 200) {
      setDepartmentList(response.data.departments);
    }
  }

  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <div className="Add-Officer">
      <div class="form_wrapper">
        <div class="form_container">
          <div class="row clearfix">
            <div class="">
              <form>
                <div class="input_field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div class="input_field">
                  {" "}
                  <input
                    type="tel"
                    name="Mobile"
                    placeholder="Mobile"
                    maxlength="10"
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>

                {/* <div class="row clearfix">
                  <div class="col_half">
                    <div class="input_field">
                      {" "}
                      <input type="text" name="name" placeholder="First Name" />
                    </div>
                  </div>
                  <div class="col_half">
                    <div class="input_field">
                      {" "}
                      <input
                        type="text"
                        name="name"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                </div> */}

                <div class="input_field select_option">
                  <select onChange={(e) => handleChange(e)}>
                    <option>Select Deparment</option>
                    {department &&
                      department.length > 0 &&
                      department.map((p) => {
                        return (
                          <option value={p.registrationNo}>
                            {p.departmentname}
                          </option>
                        );
                      })}
                  </select>
                  <div class="select_arrow"></div>
                </div>

                <input
                  class="offcer-btn"
                  type="button"
                  value="Create"
                  onClick={handleofficer}
                />
                <div className="officerErr err-hidden">
                  Officer Already Created
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="dep-header">
          <div class="modal-close-btn">
            <Close className="closeBtn" onClick={closeModal} />
          </div>
        </div>

        <form>
          <div className="title">
            <h1>Officer Created Successfully</h1>
          </div>
          <div className="body">
            <div className="username">
              <p>Registration Id : </p>
            </div>
            <div className="userid" style={{ paddingLeft: "20px" }}>
              <p>{depId}</p>
            </div>
          </div>
          <div className="footer">
            <Link to="/Admindashboard">
              <button>Continue</button>
            </Link>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddOfficer;
