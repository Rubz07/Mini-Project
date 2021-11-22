import React, { useState } from "react";
import "./Waterauthority.css";
import axios from "../../../../../../axios";
import { useHistory } from "react-router-dom";
function Waterauthority() {
  const history = useHistory();

  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [area, setArea] = useState();
  const [panchayat, setPanchayat] = useState();
  const [description, setDescription] = useState();

  const handleComplaint = async () => {
    const data = {
      category: category,
      name: name,
      area: area,
      panchayat: panchayat,
      description: description,
    };

    const res = await axios.post("/postcomplaint", data);
    if (res.status == 200) {
      history.push("/");
      console.log(res);
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <form action="" id="reg-form">
          <h3>Complaint</h3>
          <div className="dropdwn">
            <span className="lnr lnr-drop-down"></span>
            <select
              className="drp-control"
              data-flag="true"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="  " selected>
                Select Category
              </option>
              <option>Bill Related</option>
              <option>drainage</option>
            </select>
          </div>

          <div className="form-holder emailclass">
            <span className="lnr lnr-envelope"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-holder address">
            <span className="lnr lnr-phone-handset"></span>
            <input
              type="address"
              className="form-control"
              placeholder="Area / Locality"
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          <div className="form-holder pincodeclass">
            <span className="lnr lnr-phone-handset"></span>
            <input
              type="text"
              className="form-control"
              placeholder="panchayat"
              onChange={(e) => setPanchayat(e.target.value)}
            />
          </div>
          <div className="form-holder password">
            <div class="form-group">
              <textarea
                class="form-control"
                placeholder="Plese enter Text of Grievance"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="button ">
            <input
              type="button"
              value="Register"
              id="reg-btn"
              class="btn1"
              onClick={handleComplaint}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Waterauthority;
