import React from "react";
import { SuccessMarker } from "../components";

function Sandbox() {

  return (
  
    <div className="app__main">
      <h1> SuccessMarker </h1>
      <SuccessMarker wasSuccessful={true}/>
    </div>
    
  );
}

export default Sandbox;
