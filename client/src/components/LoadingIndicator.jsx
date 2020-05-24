import React from "react";

function LoadingIndicator() {
  return (
    <div className="app__main app__main--home">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
