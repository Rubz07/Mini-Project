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
              <th>User Name</th>
              <th>User Mobile</th>
              {/* <th>Proof</th> */}
              <th>Action</th>
              <th>Add Comments</th>
            </tr>
            {complaint &&
              complaint.length > 0 &&
              complaint.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td width="150px">{data.complaint_regid}</td>
                    <td width="150px">{data.complaint_description}</td>
                    <td width="150px">Rubin Siby</td>
                    <td width="150px">9048317092</td>
                    {/* <td width="100px"></td> */}
                    <td width="230px">
                      <div class="input_field cmpselect_option">
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
                          <option>Update Status</option>
                          <option value="resolved">Resolved</option>
                          <option value="processing">Processing</option>
                          <option value="rejected">Rejected</option>
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
                        <div class="select_arrow"></div>
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
