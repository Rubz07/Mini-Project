import React, { useState, useEffect, useContext } from "react";
import "./ComplaintForm.css";
import axios from "../../../../axios";
import { Link, Route, useLocation, useHistory } from "react-router-dom";
import { userContext } from "../../../../AppContext";
import Modal from "react-modal";
function ComplaintForm() {
  const [departmentName, setDepartmentName] = useState(null);
  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [area, setArea] = useState();
  const [panchayat, setPanchayat] = useState();
  const [description, setDescription] = useState();
  const location = useLocation();
  const history = useHistory();
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
      if (
        window.confirm("Registration Successfull \n \n Do You want to go back?")
      ) {
        history.push("/dashboard");
      } else {
      }
    } else {
      alert("Some error occured");
    }
  };
  return (
    <div className="complaintForm">
      <div className="form-title">Complaint</div>
      <form>
        <div className="complaint-details">
          <div className="input-box">
            <span className="details">Select category</span>
            <select
              className="drp-control"
              data-flag="true"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="  " selected>
                Select Category
              </option>
              <option>Payment Related</option>
              <option>Employ Related</option>
              <option>Otheres</option>
            </select>
          </div>

          <div className="input-box">
            <span className="details">Full name</span>
            <input
              type="text"
              className="complaint-input"
              value={userdata.username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Area</span>
            <input
              type="text"
              className="complaint-input"
              placeholder="Enter Locality"
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Panchayat</span>
            <input
              type="text"
              className="complaint-input"
              placeholder="Enter Panchayat"
              onChange={(e) => setPanchayat(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <span className="details">Description</span>
            <textarea
              placeholder="Enter Details"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="input-box">
            <span className="details">
              {" "}
              Attach supporting documment(if any)
            </span>
            <input type="file" className="complaint-proof" name="" id="" />
          </div>
          <div className="complaint-submit">
            <input
              type="button"
              className="complaint-submit"
              value="Submit"
              onClick={handleComplaint}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ComplaintForm;
