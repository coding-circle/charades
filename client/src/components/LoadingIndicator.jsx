// reference: https://github.com/tobiasahlin/SpinKit
import React from "react";
import "./LoadingIndicator.css";

function LoadingIndicator() {
  return (
    <div className="app__main app__main--home">
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
