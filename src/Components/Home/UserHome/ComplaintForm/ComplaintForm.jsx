import React, { useState, useEffect, useContext } from "react";
import "./ComplaintForm.css";
import axios from "../../../../axios";
import { Close } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { userContext } from "../../../../AppContext";
import Modal from "react-modal";
function ComplaintForm() {
  const [departmentName, setDepartmentName] = useState(null);
  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [area, setArea] = useState();
  const [panchayat, setPanchayat] = useState();
  const [description, setDescription] = useState();
  // const [regID, setRegId] = useState();
  const location = useLocation();
  const { userdata } = useContext(userContext);
  console.log(userdata);

  useEffect(() => {
    const { department } = location;
    setDepartmentName(department);
  }, [location]);

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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleComplaint = async () => {
    const data = {
      userid: userdata.userid,
      department: departmentName,
      category: category,
      name: name,
      area: area,
      panchayat: panchayat,
      description: description,
    };

    const res = await axios.post("/postcomplaint", data);
    if (res.status === 200) {
      // await setRegId(res.data.regno);
      openModal();
    } else {
      alert("Some error occured");
    }
  };
  return (
    <div className="complaint-form">
      <div class="comp_form_wrapper">
        <div class="form_container">
          <div class="row clearfix">
            <div class="">
              <form>
                {" "}
                <div class="row clearfix">
                  <div class="col_half">
                    <div class="input_field select_option">
                      <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="  " selected>
                          Select Category
                        </option>
                        <option>Payment Related</option>
                        <option>Employ Related</option>
                        <option>Otheres</option>
                      </select>
                      <div class="select_arrow"></div>
                    </div>
                  </div>
                  <div class="col_half">
                    <div class="input_field">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full name"
                        value={userdata.username}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="row clearfix">
                  <div class="col_half">
                    <div class="input_field">
                      {" "}
                      <input
                        type="text"
                        placeholder="Name of the office or locality"
                        onChange={(e) => setArea(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div class="col_half">
                    <div class="input_field">
                      {" "}
                      <input
                        type="text"
                        placeholder="Enter Panchayat"
                        onChange={(e) => setPanchayat(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="input_field">
                  {" "}
                  <textarea
                    placeholder="Enter Details"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div class="input_field">
                  {" "}
                  <input
                    type="file"
                    className="complaint-proof"
                    name=""
                    id=""
                  />
                </div>
                <input
                  class="offcer-btn"
                  type="button"
                  value="Create"
                  onClick={handleComplaint}
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
            <h1>Complaint Registered Successfully</h1>
          </div>
          <div className="body">
            <div className="username">
              <p>Registration ID has been sended to your mobile number </p>
            </div>
          </div>
          <div className="footer">
            <Link to="/dashboard">
              <button>Continue</button>
            </Link>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ComplaintForm;
