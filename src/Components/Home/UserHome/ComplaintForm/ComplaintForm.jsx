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
  const [description, setDescription] = useState();
  // const [regID, setRegId] = useState();
  const location = useLocation();
  const { userdata } = useContext(userContext);

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

  async function setmain_category(e) {
    e.preventDefault();
    setMainCategory(e.target.value);
    if (document.getElementById("cat").value === "Bank Loker Related") {
      document.getElementById("bankLocker").style.display = "block";
      document.getElementById("banks").style.display = "block";
      document.getElementById("branch").style.display = "block";
    }

    if (
      document.getElementById("cat").value ===
      "Deficiency in Customer Service Related"
    ) {
      document.getElementById("customerService").style.display = "block";
      document.getElementById("banks").style.display = "block";
      document.getElementById("branch").style.display = "block";
    }

    if (document.getElementById("cat").value === "Housing Lone Related") {
      document.getElementById("housingLoan").style.display = "block";
      document.getElementById("banks").style.display = "block";
      document.getElementById("branch").style.display = "block";
    }

    if (
      document.getElementById("cat").value === "Credit/Debit/ATM Cards Related"
    ) {
      document.getElementById("cards").style.display = "block";
      document.getElementById("banks").style.display = "block";
      document.getElementById("branch").style.display = "block";
    }
    // else {
    // //   document.getElementById("name").style.display = "block";
    // // }

    if (document.getElementById("cat").value === "Service Charges Related") {
      document.getElementById("serviceCharges").style.display = "block";
      document.getElementById("banks").style.display = "block";
      document.getElementById("branch").style.display = "block";
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
                    <option value="Bank Loker Related">
                      Bank Loker Related
                    </option>
                    <option value="Deficiency in Customer Service Related">
                      Deficiency in Customer Service Related
                    </option>

                    <option value="Housing Lone Related">
                      Housing Lone Related
                    </option>

                    <option value="Credit/Debit/ATM Cards Related">
                      Credit/Debit/ATM Cards Related
                    </option>
                    <option value="Service Charges Related">
                      Service Charges Related
                    </option>
                    <option value="Miscellaneous/Others">
                      Miscellaneous/Others
                    </option>
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
                    <option value="Non-availability of Locker">
                      Non-availability of Locker
                    </option>
                    <option value="Demand of Fixed Deposit">
                      Demand of Fixed Deposit
                    </option>
                    <option value="Problem in Locker Operation">
                      Problem in Locker Operation
                    </option>
                    <option value="Unauthorised break opening of Locker">
                      Unauthorised break opening of Locker
                    </option>
                    <option value="Others">Others</option>
                  </select>
                  {/* <div   class="select_arrow"></div> */}
                </div>
                {/* <-----------2- Deficiency in Customer Service Related------------> */}
                <div class="input_field select_option">
                  <select
                    style={{}}
                    id="customerService"
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    <option value="  " selected>
                      Select Next Level Category
                    </option>
                    <option value="Acceptance of Cash">
                      Acceptance of Cash
                    </option>
                    <option value="Issue/Payment of Draft/Banker Cheque">
                      Issue/Payment of Draft/Banker Cheque
                    </option>
                    <option value="Delay in Service">Delay in Service</option>
                    <option value="Frequent Failure of Bank Server">
                      Frequent Failure of Bank Server
                    </option>
                    <option value="Others">Others</option>
                  </select>
                  {/* <div class="select_arrow"></div> */}
                </div>
                {/* <-----------2- Housing Loan Related------------> */}
                <div class="input_field select_option">
                  <select
                    style={{}}
                    id="housingLoan"
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    <option value="  " selected>
                      Select Next Level Category
                    </option>
                    <option value="Related to Banks">Related to Banks</option>
                    <option value="Related to Housing Finance Companies">
                      Related to Housing Finance Companies
                    </option>
                  </select>
                  {/* <div class="select_arrow"></div> */}
                </div>
                {/* <-----------2-  Credit/Debit/ATM Cards Related------------> */}
                <div class="input_field select_option">
                  <select
                    style={{}}
                    id="cards"
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    <option value="  " selected>
                      Select Next Level Category
                    </option>
                    <option value="Non issuance of ATM Pin">
                      Non issuance of ATM Pin
                    </option>
                    <option value="Non issuance of Credit/Debit/Atm cards">
                      Non issuance of Credit/Debit/Atm cards
                    </option>
                  </select>
                  {/* <div class="select_arrow"></div> */}
                </div>
                {/* <-----------2-Service charges Related------------> */}
                <div class="input_field select_option">
                  <select
                    style={{}}
                    id="serviceCharges"
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    <option value="  " selected>
                      Select Next Level Category
                    </option>
                    <option value="Non Maintenance of Minimum Balance">
                      Non Maintenance of Minimum Balance
                    </option>
                    <option value="Loan Processing charges">
                      Loan Processing charges
                    </option>
                    <option value="Annual Maintenance charges on Credit/Debit/Atm Cards">
                      Annual Maintenance charges on Credit/Debit/Atm Cards
                    </option>
                  </select>
                  {/* <div class="select_arrow"></div> */}
                </div>
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
                    <option value="Reserve Bank of India">
                      Reserve Bank of India
                    </option>
                    <option value="Andhra Bank">Andhra Bank</option>
                    <option value="Allahabad Bank">Allahabad Bank</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="Bank of India">Bank of India</option>
                    <option value="Bank of Maharashtra">
                      Bank of Maharashtra
                    </option>
                    <option value="Central Bank of India">
                      Service Charges Related
                    </option>
                    <option value="Canara Bank">Canara Bank</option>
                    <option value="Corporation Bank">Corporation Bank</option>
                    <option value="Idbi Bank">Idbi Bank</option>
                    <option value="Punjab National Bank">
                      Punjab National Bank
                    </option>
                  </select>
                  {/* <div class="select_arrow"></div> */}
                </div>
                <div class="input_field select_option">
                  {" "}
                  <input
                    style={{}}
                    id="branch"
                    type="text"
                    onChange={(e) => setBankBranch(e.target.value)}
                    placeholder="Branch / Name of Bank and Branch"
                    // onChange={(e) => setArea(e.target.value)}
                    required
                  />
                </div>
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
