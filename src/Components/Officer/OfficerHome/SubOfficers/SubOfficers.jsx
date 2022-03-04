import React, { useState, useEffect } from "react";
import "./SubOfficers.css";
import axios from "../../../../axios";
import Modal from "react-modal";
import { Close } from "@material-ui/icons";
import { Link } from "react-router-dom";
function SubOfficers() {
  const officerErr = document.querySelector(".officerErr");
  const [department, setDepartment] = useState([]);
  const [departmentId, setDepartmentId] = useState([]);

  const [district, setDistrict] = useState(null);
  const [name, setName] = useState(null);
  const [mobile, setMobile] = useState(null);

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

  async function handleSubofficer() {
    const data = {
      distrct: district,
      name: name,
      mobile: mobile,
      departmentName: department,
      departmentId: departmentId,
    };
    let response = await axios.post(`officer/add-Subofficer`, data);
    console.log(response);
    if (response.status === 200 && response.data.verify === "Approved") {
      officerErr.classList.add("err-hidden");
      openModal();
    } else {
      officerErr.classList.remove("err-hidden");
    }
  }

  async function getDepartment() {
    const token = localStorage.getItem("officer-token");
    let response = await axios.post(`officer/get-DepartmentDetails`, {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      setDepartment(response.data.data.department);
      setDepartmentId(response.data.data.departmentId);
    }
  }

  useEffect(() => {
    getDepartment();
  }, []);
  return (
    <div className="Add-Subofficer">
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

                <div class="input_field select_option">
                  <select onChange={(e) => setDistrict(e.target.value)}>
                    <option>Select District</option>
                    <option value="AL">Alappuzha</option>
                    <option value="ER">Ernakulam</option>
                    <option value="ID">Idukki</option>
                    <option value="KN">Kannur</option>
                    <option value="KS">Kasargod</option>
                    <option value="KL">Kollam</option>
                    <option value="KT">Kottayam</option>
                    <option value="KZ">Kozhikode</option>
                    <option value="MA">Malappuram</option>
                    <option value="PL">Palakkad</option>
                    <option value="PT">Pathanamthitta</option>
                    <option value="TV">Thiruvananthapuram</option>
                    <option value="TS">Thrissur</option>
                    <option value="WA">Wayanad</option>
                    {/* {department &&
                      department.length > 0 &&
                      department.map((p) => {
                        return (
                          <option value={p.registrationNo}>
                            {p.departmentname}
                          </option>
                        );
                      })} */}
                  </select>
                  <div class="select_arrow"></div>
                </div>

                <input
                  class="offcer-btn"
                  type="button"
                  value="Create"
                  onClick={handleSubofficer}
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
              <p>1111</p>
            </div>
          </div>
          <div className="footer">
            <Link to="/Officerdashboard">
              <button>Continue</button>
            </Link>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default SubOfficers;
