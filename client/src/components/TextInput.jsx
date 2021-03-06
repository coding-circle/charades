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
  variant,
}) => {
  const classes = `${label && "text-input__label"}
    ${subLabel ? "text-input__label--with-sublabel" : ""}`;

  const handleChange = (e) => {
    if (variant === "number") {
      e.target.value = e.target.value.replace(/\D/, "");
    }

    onChange(e);
  };
  const inputMode = variant === "number" ? "numeric" : "text";

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
          type="text"
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className="text__bold text-input__multiline text__heading"
          cols="20"
          rows="2"
          inputMode={inputMode}
        />
      ) : (
        <input
          disabled={disabled}
          name={name}
          type="text"
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className="text__all-caps text__bold text__heading"
          inputMode={inputMode}
        />
      )}
    </div>
  );
};

export default TextInput;
