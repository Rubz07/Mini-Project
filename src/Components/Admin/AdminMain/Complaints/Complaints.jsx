import React, { useState, useEffect, Component, PropTypes } from "react";
import axios from "../../../../axios";
import "./Complaints.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function Complaints() {
  const reportDetails = document.querySelector(".reportDetails-container");

  const [department, setDepartmentList] = useState(null);
  const [date, setDate] = useState(null);
  const [complaints, setComplaints] = useState(null);

  const [departmentName, setDepartmentName] = useState(null);
  const [complaintCount, totComplaintCount] = useState(null);
  const [processingComplaintCount, totProcessingComplaintCount] =
    useState(null);
  const [resolvedComplaintCount, totResolvedComplaintCount] = useState(null);
  const [reportedComplaintCount, totReportedComplaintCount] = useState(null);
  const [escalatedComplaintCount, totEscalatedComplaintCount] = useState(null);

  function printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [4, 2],
      });
      pdf.addImage(imgData, "JPEG", 2, 1);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  async function reportDetailsfun() {
    reportDetails.classList.remove("reportDetails-container_hide");

    var complaintCount = complaints.filter(function (p) {
      return p.department === departmentName;
    });

    var totalProcessingComplaintCount = complaints.filter(function (p) {
      return (
        (p.department === departmentName && p.status === "Assigned") ||
        p.status === "Reported" ||
        p.status === "Processing"
      );
    });
    var totalReportedComplaintCount = complaints.filter(function (p) {
      return p.department === departmentName && p.status === "Reported";
    });

    var totalResolvedComplaintCount = complaints.filter(function (p) {
      return p.department === departmentName && p.status === "Resolved";
    });

    var totalEscalatedComplaintCount = complaints.filter(function (p) {
      return p.department === departmentName && p.ticket_raised === true;
    });

    totComplaintCount(complaintCount.length);
    totProcessingComplaintCount(totalProcessingComplaintCount.length);
    totResolvedComplaintCount(totalResolvedComplaintCount.length);
    totReportedComplaintCount(totalReportedComplaintCount.length);
    totEscalatedComplaintCount(totalEscalatedComplaintCount.length);
  }

  async function getComplaints() {
    let response = await axios.get(`admin/getComplaint`);
    if (response.status === 200) {
      setComplaints(response.data.complaint);
    }
  }

  async function getDepartments() {
    let response = await axios.get(`admin/get-departments`);
    if (response.status === 200) {
      setDepartmentList(response.data.departments);
    }
  }

  useEffect(() => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    setDate(date);
    getComplaints();
    getDepartments();
  }, []);
  return (
    <div className="report-main">
      <div class="report-container">
        <div class="report-content">
          <div className="reportinput-box">
            <span className="report-details">Select Department</span>
            <select
              style={{ width: "200px" }}
              onChange={(e) => setDepartmentName(e.target.value)}
            >
              <option value="null">Select Department</option>
              {department &&
                department.length > 0 &&
                department.map((p) => {
                  return (
                    <option value={p.departmentname}>{p.departmentname}</option>
                  );
                })}
            </select>
          </div>
          <div className="report-submit">
            <input
              type="button"
              className="report-submitbtn"
              value="Check"
              onClick={reportDetailsfun}
            />
          </div>
        </div>
      </div>

      <div
        class="reportDetails-container  reportDetails-container_hide"
        style={{ marginTop: "250px" }}
        id="divToPrint"
      >
        <div className="printReport">
          <button className="departmentAddButton" onClick={printDocument}>
            Print
          </button>
        </div>
        <div className="date">
          <h4>Date : {date}</h4>
        </div>

        <div class="reportDetails-content">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <th>Total number of Registered Complaints : </th>
              <th style={{ textAlign: "left" }}>{complaintCount}</th>
            </tr>
            <tr>
              <th> Total number of Processing Complaints : </th>
              <th style={{ textAlign: "left" }}>{processingComplaintCount}</th>
            </tr>
            <tr>
              <th> Total number of Resolved Complaints : </th>
              <th style={{ textAlign: "left" }}>{resolvedComplaintCount}</th>
            </tr>
            <tr>
              <th> Total number of Reported Complaints : </th>
              <th style={{ textAlign: "left" }}>{reportedComplaintCount}</th>
            </tr>
            <tr>
              <th> Total number of Escalated Complaints : </th>
              <th style={{ textAlign: "left" }}>{escalatedComplaintCount}</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
