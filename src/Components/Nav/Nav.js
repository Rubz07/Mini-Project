import React, { useState } from "react";
import bgimage from "../../Assets/Images/bg.png";
import "./Nav.css"
const firstComponent = () => {
  return (
    <div classNam="content">
     <input type="text"></input>
     <input type="text"></input>
     <input type="text"></input>
     <input type="text"></input>
    </div>
  );
};
const secondComponent = () => {
  return <div></div>;
};
const thirdComponent = () => {
  return <div></div>;
};
const finalComponent = () => {
  return <div>Final Component</div>;
};

function Nav() {
  const [steps, setSteps] = useState([
    {
      key: "firstStep",
      label: "My First Step",
      isDone: true,
      component: firstComponent,
    },
    {
      key: "secondStep",
      label: "My Second Step",
      isDone: false,
      component: secondComponent,
    },
    {
      key: "thirdStep",
      label: "My Third Step",
      isDone: false,
      component: thirdComponent,
    },
    {
      key: "finalStep",
      label: "My Final Step",
      isDone: false,
      component: finalComponent,
    },
  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);

  const handleNext = () => {
    if (steps[steps.length - 1].key === activeStep.key) {
      alert("You have completed all steps.");
      return;
    }

    const index = steps.findIndex((x) => x.key === activeStep.key);
    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = true;
        return x;
      })
    );
    setActiveStep(steps[index + 1]);
  };

  const handleBack = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index === 0) return;

    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = false;
        return x;
      })
    );
    setActiveStep(steps[index - 1]);
  };

  return (
    <div className="App">
    <div className="bannerClasse">
      <img className="bannerImage" alt="bannerimage" src={bgimage}></img>
    </div>
      <div className="box">
        <div className="steps">
          <ul className="nav">
            {steps.map((step, i) => {
              return (
                <li
                  key={i}
                  className={`${activeStep.key === step.key ? "active" : ""} ${
                    step.isDone ? "done" : ""
                  }`}
                >
                  <div>
                    Step {i + 1}
                    <br />
                    <span>{step.label}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="step-component">{activeStep.component()}</div>

        <div className="btn-component">
          <button
            onClick={handleBack}
            disabled={steps[0].key === activeStep.key}
          >Back</button>
          <button
            onClick={handleNext}>{ steps[steps.length - 1].key !== activeStep.key ? "Next" : "Submit"}</button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
