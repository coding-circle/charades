import React from "react";
import "./Button.css";

const Button = ({ className, type, variant, disabled, onClick, style, icon, children }) => {
  const classes = `${className || ""}
  ${type && type === "primary" ? "button-primary text__heading" : ""}
  ${type && type === "secondary" ? "button-secondary" : ""}
  ${variant && variant === "yes" ? "button-yes" : ""}
  ${variant && variant === "no" ? "button-no" : ""}
  ${!!disabled ? "button-disabled" : "" }`;

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
