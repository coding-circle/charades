import React from "react";

const TextInput = (props) => {
  const classes = `text-input__label
    ${props.subLabel ? "text-input__label--with-sublabel" : ""}`;

  return (
    <div className="text-input" style={props.style}>
      <label htmlFor={props.name} className={classes}>
        {props.label}
        {props.subLabel && (
          <span className="text-input__sub-label text__small">
            <br />
            {props.subLabel}
          </span>
        )}
      </label>
      <input
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.onChange}
        className="text__all-caps text__bold text__heading"
      />
    </div>
  );
};

export default TextInput;
