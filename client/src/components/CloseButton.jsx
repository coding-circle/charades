import React from "react";
import Button from "./Button";
import "./CloseButton.css";

function CloseButton({ onClick }) {
  return (
    <Button type="secondary" className="close-button" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <line
          x1="8.22188"
          y1="7.77824"
          x2="23.7782"
          y2="23.3346"
          stroke="white"
          strokeWidth="2"
        />
        <line
          x1="23.7782"
          y1="7.7784"
          x2="8.2218"
          y2="23.3347"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </Button>
  );
}

export default CloseButton;
