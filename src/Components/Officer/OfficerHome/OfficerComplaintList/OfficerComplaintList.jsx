import React, { useState } from "react";
import "./OfficerComplaintList.css";
function OfficerComplaintList({ complaint }) {
  return (
    <div className="complaintDetails">
      <div className="complaintTitle">Complaints</div>

      <div class="datas">
        <div class="data">
          <table>
            <tr>
              <th>Complaint Id</th>
              <th> Description</th>
              <th>District</th>
              {/* <th>Proof</th> */}
              <th>Priority</th>
              <th>Assign Officer</th>
              <th>Add Comments</th>
            </tr>
            {complaint &&
              complaint.length > 0 &&
              complaint.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td width="150px">{data.registrationNo}</td>
                    <td width="150px">{data.description}</td>
                    <td width="150px">{data.area}</td>
                    {/* <td width="100px"></td> */}
                    <td width="150px">
                      <div class="priority">
                        <select
                        // onChange={(e) =>
                        //   handleChange(
                        //     e,
                        //     data._id,
                        //     data.registrationNo,
                        //     data.description,
                        //     data.status
                        //   )
                        // }
                        >
                          <option value="High">High</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Low">Low</option>
                          {/* {department &&
                            department.length > 0 &&
                            department.map((p) => {
                              return (
                                <option value={p.registrationNo}>
                                  {p.departmentname}
                                </option>
                              );
                            })} */}
                        </select>
                      </div>
                    </td>
                    <td width="250px">
                      <div class="priority">
                        <select
                        // onChange={(e) =>
                        //   handleChange(
                        //     e,
                        //     data._id,
                        //     data.registrationNo,
                        //     data.description,
                        //     data.status
                        //   )
                        // }
                        >
                          <option value="Alappuzha">(AL) ABC</option>
                          <option value="Ernakulam">(ER) ABC</option>
                          <option value="Idukki">(ID) ABC</option>
                          <option value="Kannur">(KN) ABC</option>
                          <option value="Kasargod">(KS) ABC</option>
                          <option value="Kollam">(KL) ABC</option>
                          <option value="Kottayam">(KT) ABC</option>
                          <option value="Kozhikode">(KZ) ABC</option>
                          <option value="Malappuram">(MA) ABC</option>
                          <option value="Palakkad">(PL) ABC</option>
                          <option value="Pathanamthitta">(PT) ABC</option>
                          <option value="Thiruvananthapuram">(TV) ABC</option>
                          <option value="Thrissur">(TS) ABC</option>
                          <option value="Wayanad">(WA) ABC</option>

                          {/* {department &&
                            department.length > 0 &&
                            department.map((p) => {
                              return (
                                <option value={p.registrationNo}>
                                  {p.departmentname}
                                </option>
                              );
                            })} */}
                        </select>
                      </div>
                    </td>
                    <td width="230px">
                      <div class="input_field cmpselect_option">
                        <textarea className="officer-comments"></textarea>
                      </div>
                    </td>
                    <td>
                      {" "}
                      <button
                        className="officerComplaintUpdate"
                        // onClick={(e) => deactivateUser(e, data._id)}
                      >
                        Update
                      </button>
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

export default OfficerComplaintList;
