import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "../../../axios";
import { MDBDataTable } from "mdbreact";
import { Link, Route, useLocation } from "react-router-dom";

function Main() {
  const [count, setCount] = useState();
  const [date, setDate] = useState([]);
  const [description, setDescription] = useState();

  useEffect(() => {
    try {
      axios.get(`/getComplaint`).then((response) => {
        let a = response.data.complaint;
        let b = a.map((complaint) => {
          return complaint;
        });
        setCount(response.data.count);
        // setDescription(b[0].description);
        // setDate(b[0].date);
      });
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  // const complaintDetails = () => {
  //   try {
  //     axios.get(`/getComplaint`).then((response) => {
  //       console.log(response.data.complaint);
  //     });
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };
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
      {
        SerialNo: "1",
        RegistrationNo: "186475",
        Date: "11/23/2021",
        Description: "water lekage",
        Status: "Approved",
      },
      {
        SerialNo: "1",
        RegistrationNo: "186475",
        Date: "11/23/2021",
        Description: "water lekage",
        Status: "Approved",
      },
      {
        SerialNo: "1",
        RegistrationNo: "186475",
        Date: "11/23/2021",
        Description: "water lekage",
        Status: "Approved",
      },
      {
        SerialNo: "1",
        RegistrationNo: "186475",
        Date: "11/23/2021",
        Description: "water lekage",
        Status: "Approved",
      },
      {
        SerialNo: "1",
        RegistrationNo: "186475",
        Date: "11/23/2021",
        Description: "water lekage",
        Status: "Approved",
      },
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
          <MDBDataTable striped bordered small data={data} />
        </div>
      </div>
    </main>
  );
}

export default Main;
