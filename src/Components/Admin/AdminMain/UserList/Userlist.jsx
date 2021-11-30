import React, { useState, useEffect } from "react";
import "./UserList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../../../dummyData";
import { Link } from "react-router-dom";
import axios from "../../../../axios";

//=============GET ALL USERS================//
function Userlist() {
  const [users, setUsers] = useState([]);
  async function getComplaints() {
    let response = await axios.get(`/admin/getUsers`);
    if (response.status === 200) {
      setUsers(response.data.users);
    }
  }

  //=============Delete User================//
  async function deactivateUser(id) {
    let response = await axios.get(`/deleteUser/` + id);
    if (response.status === 200) {
      console.log(response);
    }
  }

  useEffect(() => {
    getComplaints();
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
                    <td width="200px">
                      <DeleteOutline
                        className="userListDelete"
                        onClick={deactivateUser(data._id)}
                      />
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Userlist;
