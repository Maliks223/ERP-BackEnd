import React from "react";
import "./companyData.css";

const CompanyData = (props) => {
  return (
    <>
      <div className="companyData">
        {props.title}
        <div>Total: "{props.number}"</div>
        
      </div>
    </>
  );
};

export default CompanyData;
