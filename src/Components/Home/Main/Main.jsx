import React from "react";
import "./Main.css";
import { MDBDataTable } from "mdbreact";
import hello from "../../../Assets/images/hello.svg";
import Charts from "../Charts/Charts";
function Main() {
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
        Date: "2011/04/25",
        Description: "Water lekage",
        Status: "Approved",
      },
      {
        SerialNo: "2",
        RegistrationNo: "186475",
        Date: "2011/04/25",
        Description: "Water lekage",
        Status: "Approved",
      },
      {
        SerialNo: "3",
        RegistrationNo: "186475",
        Date: "2011/04/25",
        Description: "Water lekage",
        Status: "closed",
      },
      {
        SerialNo: "4",
        RegistrationNo: "186475",
        Date: "2011/04/25",
        Description: "Water lekage",
        Status: "Approved",
      },
      {
        SerialNo: "5",
        RegistrationNo: "186475",
        Date: "2011/04/25",
        Description: "Water lekage",
        Status: "pending",
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
              <span className="font-bold text-title">2467</span>
            </div>
            <div className="card_inner">
              <p className="text-primary-p">Total Grievances Registered</p>
            </div>
          </div>

          <div className="card card_b">
            <div className="top-sec">
              <i className="fa fa-file-alt fa-3x text-yellow"></i>
              <span className="font-bold text-title">2467</span>
            </div>
            <div className="card_inner">
              <p className="text-primary-p">Number of Grievances Pending</p>
            </div>
          </div>

          <div className="card card_c">
            <div className="top-sec">
              <i className="fa fa-file-alt fa-3x text-green"></i>
              <span className="font-bold text-title">2467</span>
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
