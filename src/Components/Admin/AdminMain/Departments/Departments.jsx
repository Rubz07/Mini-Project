import React, { useState, useEffect } from "react";
import { DeleteOutline, Edit, Close } from "@material-ui/icons";

import axios from "../../../../axios";
import "./Departments.css";

import Modal from "react-modal";
function Departments() {
  const [departments, setDepartments] = useState(null);
  const [department, setDepartmentList] = useState(null);

  const departmentErr = document.querySelector(".departmentErr");
  const [errorMessage, setErrorMessage] = useState();
  // update department
  const [depName, setDepName] = useState(null);
  const [newDep, setNewDep] = useState(null);
  const [depid, setDepid] = useState(null);

  // update department
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
  const [updateModal, setUpdateMoldal] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openUpdateModal(id, name) {
    console.log(id, name);
    setDepid(id);
    setDepName(name);
    setUpdateMoldal(true);
  }

  function closeUpdateModal() {
    setUpdateMoldal(false);
  }

  /*=================API CALL=================*/

  async function getDepartments() {
    let response = await axios.get(`admin/get-departments`);
    if (response.status === 200) {
      setDepartmentList(response.data.departments);
    }
  }

  useEffect(() => {
    getDepartments();
  }, []);

  const handleSubmit = async () => {
    const data = {
      name: departments,
    };
    const response = await axios.post("admin/create-department", data);

    if (response.data.status === true) {
      getDepartments();
      setIsOpen(false);
    } else {
      setErrorMessage(response.data.message);
      departmentErr.classList.remove("departmentErr-hidden");
    }
  };

  const handleUpdate = async () => {
    const data = {
      id: depid,
      newdep: newDep,
    };
    const response = await axios.post("admin/update-department", data);
    if (response.status === 200) {
      getDepartments();
      setUpdateMoldal(false);
    } else {
      console.log(response);
    }
  };

  const removeDepartment = async (e, id) => {
    e.preventDefault();
    const response = await axios.post("admin/remove-department/" + id);
    if (response.status === 200) {
      getDepartments();
    } else {
      console.log(response);
    }
  };
  /*=================API CALL=================*/

  return (
    <div className="departmentList">
      <div className="depmain-header">
        <div className="departmentTitle"> departments</div>

        <div className="createDepartment">
          <button className="departmentAddButton" onClick={openModal}>
            Create
          </button>
        </div>
      </div>

      <div class="departmentDatas">
        <div class="departmentData">
          <table>
            <tr>
              <th style={{ padding: "20px" }}>Sl.No</th>
              <th>Name</th>
              <th>Registration ID</th>
              <th>Officer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {department &&
              department.length > 0 &&
              department.map((p, index) => {
                return (
                  <tr key={p._id}>
                    <td>{index}</td>
                    <td width="280px">{p.departmentname}</td>
                    <td width="200px">{p.registrationNo}</td>
                    <td width="200px"></td>
                    <td width="200px">{p.status}</td>
                    <td width="200px">
                      <Edit
                        className="editDep"
                        onClick={(e) =>
                          openUpdateModal(p._id, p.departmentname)
                        }
                      />

                      <DeleteOutline
                        className="departmentListDelete"
                        onClick={(e) => removeDepartment(e, p._id)}
                      />
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
        <div className="dep-header">
          <div className="departmentform-title">Create Department</div>
          <div class="modal-close-btn">
            <Close className="closeBtn" onClick={closeModal} />
          </div>
        </div>

        <form>
          <div className="department-details">
            <div className="departmentinput-box">
              <span className="departmentDetails">Department Name</span>
              <input
                type="text"
                className="department-input"
                placeholder="Enter name"
                onChange={(e) => setDepartments(e.target.value)}
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
          <div className="departmentErr departmentErr-hidden ">
            <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
          </div>
        </form>
      </Modal>

      {/*updation modal*/}
      <Modal
        isOpen={updateModal}
        onRequestClose={closeUpdateModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="dep-header">
          <div className="departmentform-title">Update Department</div>
          <div class="modal-close-btn">
            <Close className="closeBtn" onClick={closeUpdateModal} />
          </div>
        </div>

        <form>
          <div className="department-details">
            <div className="departmentinput-box">
              <span className="departmentDetails">Department Name</span>
              <input
                type="text"
                className="department-input"
                placeholder={depName}
                onChange={(e) => setNewDep(e.target.value)}
                required
              />
            </div>
            <div className="bttn">
              <input
                type="button"
                className="department-submit"
                value="UPDATE"
                onClick={handleUpdate}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Departments;
