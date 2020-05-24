import React from "react";

const Button = (props) => {
  const classes = `button
  ${props.className ? props.className : ""}
  ${props.type === "primary" && "button-primary text__heading"}
  ${props.type === "secondary" && "button-secondary"}
  ${props.disabled && "button-disabled"}`;

  return (
    <button
      className={classes}
      onClick={props.onClick}
      style={props.style}
      disabled={props.disabled}
    >
      {props.icon && (
        <span className="button-secondary__icon">{props.icon}</span>
      )}
      {props.children}
    </button>
  );
};

export default Button;
