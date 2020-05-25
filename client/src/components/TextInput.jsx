import React from "react";

const TextInput = ({ style, label, subLabel, name, value, onChange }) => {
  const classes = `${label && "text-input__label"}
    ${subLabel ? "text-input__label--with-sublabel" : ""}`;

  return (
    <div className="text-input" style={style}>
      <label htmlFor={name} className={classes}>
        {label}
        {subLabel && (
          <span className="text-input__sub-label text__small">
            <br />
            {subLabel}
          </span>
        )}
      </label>
      <input
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        className="text__all-caps text__bold text__heading"
      />
    </div>
  );
};

export default TextInput;
