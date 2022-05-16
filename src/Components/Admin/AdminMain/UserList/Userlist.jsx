import React, { useState, useEffect } from "react";
import "./UserList.css";
import { DeleteOutline, Close } from "@material-ui/icons";

import { Link } from "react-router-dom";
import axios from "../../../../axios";
import Modal from "react-modal";
//=============GET ALL USERS================//
function Userlist() {
  const [users, setUsers] = useState([]);
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
  const [name, setName] = useState(false);
  const [userid, setUserId] = useState(false);

  function openModal(name, id) {
    setName(name);
    setUserId(id);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function getUsers() {
    let response = await axios.get(`/admin/getUsers`);
    if (response.status === 200) {
      setUsers(response.data.users);
    }
  }

  //=============Block User================//
  async function deactivateUser(e, id) {
    e.preventDefault();
    let response = await axios.post(`/admin/blockUser/` + id);
    if (response.status === 200) {
      getUsers();
    } else {
      console.log(response);
    }
  }
  //=============Block User================//
  async function removeUser(e, id) {
    e.preventDefault();
    let response = await axios.post(`/admin/deleteUser/` + id);
    if (response.status === 200) {
      setIsOpen(false);
      getUsers();
    } else {
      console.log(response);
    }
  }

  //=============GetAll User================//
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="userList">
      <div className="userTitle">Users</div>
      <div class="userDatas">
        <div class="Data">
          <table>
            <tr>
              <th style={{ padding: "20px" }}>Sl.No</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>District</th>
              <th>Id</th>
              <th>Proof</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {users &&
              users.length > 0 &&
              users.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td width="104px">{index}</td>
                    <td width="238px">{data.name}</td>
                    <td width="180px">{data.mobile}</td>
                    <td width="160px">{data.district}</td>
                    <td width="176px">{data.adhaar}</td>
                    <td width="208px"></td>
                    <td width="240px">{data.status}</td>
                    <td width="50px" className="action-sec">
                      <button
                        className="userListEdit"
                        onClick={(e) => deactivateUser(e, data._id)}
                      >
                        block
                      </button>
                    </td>
                    <td>
                      <DeleteOutline
                        className="userListDelete"
                        onClick={(e) => openModal(data.name, data._id)}
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
          <div class="modal-close-btn">
            <Close className="closeBtn" onClick={closeModal} />
          </div>
        </div>

        <form>
          <div className="title">
            <h1>Are You Sure You Want to Delete?</h1>
          </div>
          <div className="body">
            <div className="username">
              <p>User : </p>
            </div>
            <div className="userid" style={{ paddingLeft: "20px" }}>
              <p>{name}</p>
            </div>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                closeModal();
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={(e) => removeUser(e, userid)}>Continue</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Userlist;
