import React from "react";
import "./Button.css";

const Button = ({ className, type, disabled, onClick, style, icon, children}) => {
  const classes = `button
  ${className || ""}
  ${type === "primary" && "button-primary text__heading"}
  ${type === "secondary" && "button-secondary"}
  ${disabled && "button-disabled"}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {icon && (
        <span className="button-secondary__icon">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;
