import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "../../../axios";
import { MDBDataTable } from "mdbreact";
import { Link, Route, useLocation } from "react-router-dom";
import $ from "jquery";

function Main() {
  const [count, setCount] = useState();

  const [complaints, setComplaints] = useState([]);

  async function getComplaints() {
    let response = await axios.get(`/getComplaint`);
    setCount(response.data.count);
    if (response.status === 200) {
      setComplaints(response.data.complaint);
    }
  }

  useEffect(() => {
    getComplaints();
  }, []);

  const data = {
    columns: [
      {
        label: "Sn.",
        field: "SerialNo",
        sort: "asc",
        width: 50,
      },
      {
        label: "Registration Number",
        field: "RegistrationNo",
        sort: "asc",
        width: 150,
      },
      {
        label: "Received Date",
        field: "Date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Grievance Description",
        field: "Description",
        sort: "asc",
        width: 250,
      },
      {
        label: "Status",
        field: "Status",
        sort: "asc",
        width: 150,
      },
    ],
    rows: [
      // {
      //   SerialNo: "1",
      //   RegistrationNo: { regno } ? regno : "",
      //   Date: { date } ? date : "",
      //   Description: { description } ? description : "",
      //   Status: { status } ? status : "",
      // },

      {
        SerialNo: "1",
        RegistrationNo: "186475",
        Date: "11/24/2021",
        Description: "water lekage",
        Status: "Pending",
      },

      // {
      //   SerialNo: "1",
      //   RegistrationNo: "186475",
      //   Date: "11/23/2021",
      //   Description: "water lekage",
      //   Status: "Approved",
      // },
      // {
      //   SerialNo: "1",
      //   RegistrationNo: "186475",
      //   Date: "11/23/2021",
      //   Description: "water lekage",
      //   Status: "Approved",
      // },
      // {
      //   SerialNo: "1",
      //   RegistrationNo: "186475",
      //   Date: "11/23/2021",
      //   Description: "water lekage",
      //   Status: "Approved",
      // },
    ],
  };

  return (
    <main>
      <div className="main__container">
        {/* <div className="main__title">
          <img src={hello} alt="" />
          <div className="main__greeting">
            <h1>Hello Codersbite</h1>
            <p>Welcome to your admin dashboard</p>
          </div>
        </div> */}

        <div className="main__cards">
          <div className="card card_a">
            <div className="top-sec">
              <i className="fa fa-file-alt fa-3x text-red"></i>

              <span className="font-bold text-title">{count}</span>
            </div>
            <div className="card_inner">
              <p className="text-primary-p">Total Grievances Registered</p>
            </div>
          </div>

          <div className="card card_b">
            <div className="top-sec">
              <i className="fa fa-file-alt fa-3x text-yellow"></i>
              <span className="font-bold text-title">0</span>
            </div>
            <div className="card_inner">
              <p className="text-primary-p">Number of Grievances Pending</p>
            </div>
          </div>

          <div className="card card_c">
            <div className="top-sec">
              <i className="fa fa-file-alt fa-3x text-green"></i>
              <span className="font-bold text-title">0</span>
            </div>
            <div className="card_inner">
              <p className="text-primary-p">Number of Grievances Closed</p>
            </div>
          </div>

          {/* <div className="card">
            <i className="fa fa-thumbs-up fa-2x text-green"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Likes</p>
              <span className="font-bold text-title">645</span>
            </div>
          </div> */}
        </div>

        <div className="charts">
          <div className="charts_header">
            <p className="text-header">List of Grievances</p>
          </div>

          <table
            id="dtBasicExample"
            class="table table-striped table-bordered table-sm"
            cellspacing="0"
            width="100%"
          >
            <thead>
              <tr>
                <th class="th-sm">Sn.</th>
                <th class="th-sm">Registration Number</th>
                <th class="th-sm">Received Date</th>
                <th class="th-sm">Grievance Description</th>
                <th class="th-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints &&
                complaints.length > 0 &&
                complaints.map((data) => {
                  return (
                    <tr key={data._id}>
                      <td>1</td>
                      <td>{data.registrationNo}</td>
                      <td>{data.date}</td>
                      <td>{data.description}</td>
                      <td>{data.status}</td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Main;
