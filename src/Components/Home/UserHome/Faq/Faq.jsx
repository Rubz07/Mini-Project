import React, { useState, useRef, useEffect } from "react";
import "./Faq.css";
import { FiPlus } from "react-icons/fi";
function Faq() {
  //   const [active, setActive] = useState(false);

  //   const contentRef = useRef(null);

  //   useEffect(() => {
  //     contentRef.current.style.maxHeight = active
  //       ? `${contentRef.current.scrollHeight}px`
  //       : "0px";
  //   }, [contentRef, active]);

  //   const toggleAccordion = () => {
  //     setActive(!active);
  //   };
  return (
    <>
      <div className="App">
        <div className="category_main__container">
          <details>
            <summary>1. Where can the grievances be sent?</summary>
            <h4
              style={{
                color: "black",
                textAlign: "left",
                fontWeight: "inherit",
              }}
            >
              <div>
                The Department of Administrative Reforms and Public Grievances.
                <br />
                The above nodal agencies receive grievances online through
                Cm-Portal as well as by post or by hand in person, from the
                public.
              </div>
            </h4>
          </details>

          <details>
            <summary>2. How do I lodge the grievance?</summary>
            <h4
              style={{
                color: "black",
                textAlign: "left",
                fontWeight: "inherit",
              }}
            >
              <div>
                Log on to the portal <br />
                Click on <b>Lodge Public Grievance </b> <b> > </b>
                <b> Select Department</b> <b> > </b>{" "}
                <b> Fill the Complaint Form </b> <b> > </b>
                <b> Click Submit</b>
              </div>
            </h4>
          </details>
        </div>
      </div>
    </>
  );
}

export default Faq;
