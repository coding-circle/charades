import React from "react";
import "./Checkbox.css";

function Checkbox({ label, checked, value, onChange }) {
  const handleChange = () => onChange(!checked);

  return (
    <span className="checkbox" onClick={handleChange}>
      <input
        className="checkbox__input"
        type="checkbox"
        name={`${label}-checkbox`}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={`${label}-checkbox`}>{label}</label>
    </span>
  );
}

export default Checkbox;
