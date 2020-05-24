// reference: https://github.com/tobiasahlin/SpinKit
import React from "react";

function LoadingIndicator() {
  return (
    <div className="app__main app__main--home">
      <div class="spinner">
        <div class="cube1"></div>
        <div class="cube2"></div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
