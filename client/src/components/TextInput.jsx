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
  disabled,
  isNumberVariant,
}) => {
  const classes = `${label && "text-input__label"}
    ${subLabel ? "text-input__label--with-sublabel" : ""}`;
  const inputType = isNumberVariant ? "number" : "text";

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
          disabled={disabled}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className="text__bold text-input__multiline text__heading"
          cols="20"
          rows="2"
        />
      ) : (
        <input
          disabled={disabled}
          name={name}
          type={inputType}
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
