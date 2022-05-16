import React, { useState, useEffect, useContext } from "react";
import "./ComplaintForm.css";
import axios from "../../../../axios";
import { Close } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { userContext } from "../../../../AppContext";
import Modal from "react-modal";
function ComplaintForm() {
  const [departmentName, setDepartmentName] = useState(null);
  const [mainCategory, setMainCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [bankName, setBankName] = useState();
  const [bankBranch, setBankBranch] = useState();
  const [bankDistrict, setBankDistrict] = useState();

  const [complaintDatas, setComplaintDatas] = useState();
  const [bankData, setBankData] = useState();

  const [description, setDescription] = useState();
  // const [regID, setRegId] = useState();
  const location = useLocation();
  const { userdata } = useContext(userContext);

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
    const { department } = location;
    setDepartmentName(department);
    getBankData();
    getComplaintData();
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

  async function setmain_category(e) {
    e.preventDefault();
    setMainCategory(e.target.value);
    if (document.getElementById("cat").value === "Bank Loker Related") {
      document.getElementById("bankLocker").style.display = "block";
      document.getElementById("banks").style.display = "block";
      document.getElementById("branch").style.display = "block";
      document.getElementById("district").style.display = "block";
    }

    if (
      document.getElementById("cat").value ===
      "Deficiency in Customer Service Related"
    ) {
      document.getElementById("customerService").style.display = "block";
      document.getElementById("banks").style.display = "block";
      document.getElementById("branch").style.display = "block";
      document.getElementById("district").style.display = "block";
    }

    if (document.getElementById("cat").value === "Housing Lone Related") {
      document.getElementById("housingLoan").style.display = "block";
      document.getElementById("banks").style.display = "block";
      document.getElementById("branch").style.display = "block";
      document.getElementById("district").style.display = "block";
    }

    if (
      document.getElementById("cat").value === "Credit/Debit/ATM Cards Related"
    ) {
      document.getElementById("cards").style.display = "block";
      document.getElementById("banks").style.display = "block";
      document.getElementById("branch").style.display = "block";
      document.getElementById("district").style.display = "block";
    }
    // else {
    // //   document.getElementById("name").style.display = "block";
    // // }

    if (document.getElementById("cat").value === "Service Charges Related") {
      document.getElementById("serviceCharges").style.display = "block";
      document.getElementById("banks").style.display = "block";
      document.getElementById("branch").style.display = "block";
      document.getElementById("district").style.display = "block";
    }
  }
  const handleComplaint = async () => {
    const data = {
      userid: userdata.userid,
      department: departmentName,
      mainCategory: mainCategory,
      subCategory: subCategory,
      bankName: bankName,
      bankBranch: bankBranch,
      bankDistrict: bankDistrict,
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
        <h4 style={{ color: "black" }}>
          Ministry / Department : Financial Services (Banking Division)
        </h4>
        <div class="form_container">
          <div class="row clearfix">
            <div class="">
              <form className="complaintForm">
                {" "}
                <div class="input_field select_option">
                  <select id="cat" onChange={(e) => setmain_category(e)}>
                    <option value="  " selected>
                      Select Category
                    </option>
                    {complaintDatas &&
                      complaintDatas.length > 0 &&
                      complaintDatas.map((p) => {
                        return (
                          <option value={p.main_complaint}>
                            {p.main_complaint}
                          </option>
                        );
                      })}
                  </select>
                  {/* <div class="select_arrow"></div> */}
                </div>
                {/* <-----------2-bankLocker------------> */}
                <div class="input_field select_option ">
                  <select
                    // className="bank_category"
                    style={{}}
                    id="bankLocker"
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    <option value="  " selected>
                      Select Next Level Category
                    </option>
                    {complaintDatas &&
                      complaintDatas.length > 0 &&
                      complaintDatas.map((p) => {
                        return (
                          <option value={p.sub_complaint}>
                            {p.sub_complaint}
                          </option>
                        );
                      })}
                  </select>
                  {/* <div   class="select_arrow"></div> */}
                </div>
                {/* <-----------2- Deficiency in Customer Service Related------------> */}
                {/* <------------3-------------> */}
                <div class="input_field select_option">
                  <select
                    style={{}}
                    id="banks"
                    onChange={(e) => setBankName(e.target.value)}
                  >
                    <option value="  " selected>
                      Please select a Bank
                    </option>
                    {bankData &&
                      bankData.length > 0 &&
                      bankData.map((p) => {
                        return (
                          <option value={p.bank_name}>{p.bank_name}</option>
                        );
                      })}
                  </select>
                  {/* <div class="select_arrow"></div> */}
                </div>
                <div class="input_field select_option">
                  {" "}
                  <select
                    className="drp-control"
                    data-flag="true"
                    id="district"
                    onChange={(e) => setBankDistrict(e.target.value)}
                  >
                    <option value="  " selected>
                      Select Bank District
                    </option>
                    <option>Afghanistan</option>
                    <option value="Alappuzha">Alappuzha</option>
                    <option value="Ernakulam">Ernakulam</option>
                    <option value="Idukki">Idukki</option>
                    <option value="Kannur">Kannur</option>
                    <option value="Kasaragod">Kasaragod</option>
                    <option value="Kollam">Kollam</option>
                    <option value="Kottayam">Kottayam</option>
                    <option value="Kozhikode">Kozhikode</option>
                    <option value="Malappuram">Malappuram</option>
                    <option value="Palakkad">Palakkad</option>
                    <option value="Pathanamthitta">Pathanamthitta</option>
                    <option value="Thiruvananthapuram">
                      Thiruvananthapuram
                    </option>
                    <option value="Thrissur">Thrissur</option>
                    <option value="Wayanad">Wayanad</option>
                  </select>
                </div>
                <input
                  style={{}}
                  id="branch"
                  type="text"
                  onChange={(e) => setBankBranch(e.target.value)}
                  placeholder="Branch / Name of Bank and Branch"
                  required
                />
                <input
                  style={{}}
                  id="IFSC Code"
                  type="text"
                  // onChange={(e) => setBankBranch(e.target.value)}
                  placeholder="IFSC Code"
                  required
                />
                {/* <------------3-------------> */}
                {/* <div class="col_half">
                  <div class="input_field">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      disabled
                      placeholder="Full name"
                      value={userdata.username}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
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
                </div> */}
                <div class="input_field">
                  {" "}
                  <textarea
                    placeholder="Grievance Description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                {/* <div class="input_field">
                  {" "}
                  <input
                    type="file"
                    className="complaint-proof"
                    name=""
                    id=""
                  />
                </div> */}
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
