import React from "react";
import "./TextInput.css";

const TextInput = ({
  style,
  label,
  subLabel,
  name,
  value,
  onChange,
  maxLength,
  multiline,
}) => {
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
      {multiline ? (
        <textarea
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className="text__bold text-input__multiline text__heading"
          cols="20"
          rows="2"
        />
      ) : (
        <input
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className="text__all-caps text__bold text__heading"
        />
      )}
    </div>
  );
};

export default TextInput;
