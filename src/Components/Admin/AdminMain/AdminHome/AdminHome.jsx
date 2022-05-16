import React, { useState, useEffect } from "react";
import Charts from "../../Charts/Charts";
import Featuredinfo from "../../Featuredinfo/Featuredinfo";
import axios from "../../../../axios";
import "./AdminHome.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { userData } from "../../../../dummyData";
import WidgetSmall from "../../WidgetSmall/WidgetSmall";
import WidgetLarge from "../../WidgetLarge/WidgetLarge";

function AdminHome() {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [officer, setOfficer] = useState([]);
  const [subOfficer, setSubOfficer] = useState([]);

  // async function getComplaints() {
  //   let response = await axios.get(`/getComplaint`);
  //   if (response.status === 200) {
  //     setComplaints(response.data.complaint);
  //   }
  // }

  async function getUsers() {
    let response = await axios.get(`/admin/getUsers`);
    if (response.status === 200) {
      setUsers(response.data.users);
    }
  }

  async function getDepartments() {
    let response = await axios.get(`admin/get-departments`);
    if (response.status === 200) {
      setDepartmentList(response.data.departments);
    }
  }
  async function getOfficers() {
    let response = await axios.get(`/admin/getOfficers`);
    if (response.status === 200) {
      setOfficer(response.data.officer);
    }
  }

  async function getSubOfficers() {
    let response = await axios.get(`officer/manageOfficers`);
    if (response.status === 200) {
      setSubOfficer(response.data.officer);
    }
  }
  useEffect(() => {
    getUsers();
    getDepartments();
    getOfficers();
    getSubOfficers();
  }, []);
  return (
    <Router>
      <Switch>
        <div className="adminHome">
          <Featuredinfo
            Users={users}
            Departments={departmentList}
            officer={officer}
            subOfficer={subOfficer}
          />
          <div className="homeWidgets">
            {/* <WidgetSmall />
            <WidgetLarge /> */}
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default AdminHome;
