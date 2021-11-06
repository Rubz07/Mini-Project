import React from "react";
import bgimage from "../../Assets/Images/bg.png";
function banner() {
  return (
    <div className="bannerClasse">
      <img className="bannerImage" alt="bannerimage" src={bgimage}></img>
    </div>
  );
}

export default banner;
