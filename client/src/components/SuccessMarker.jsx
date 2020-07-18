import React from "react";
import "./SuccessMarker.css";

const SuccessMarker = ({ wasSuccessful }) => {

  return (
    <>
    {wasSuccessful ? (
      <div className="success-marker">
        <span>✓</span>
      </div>
    ) : (
      <div className="success-marker success-marker_failure">
        <span>✕</span>
      </div>
    )
    }
    </>
  );
};

export default SuccessMarker;



