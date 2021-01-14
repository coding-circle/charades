import React, { useState } from "react";
import "./Checkbox.css";

function Checkbox({ label, checked, value, onChange, labelBefore }) {
  const [isChecked, setChecked] = useState(!!checked);
  const handleChange = () => {
    const checkedState = !isChecked;
    setChecked(checkedState);
    onChange(checkedState);
  };
  const baseClass = "checkbox";
  const wrapperClass = labelBefore
    ? `${baseClass} ${baseClass}--label-before`
    : baseClass;
  return (
    <span className={wrapperClass} onClick={handleChange}>
      <input
        className="checkbox__input"
        type="checkbox"
        name={`${label}-checkbox`}
        value={value}
        checked={isChecked}
      />
      <div className="checkbox__overlay">
        <span className="checkbox__check">&#10003;</span>
      </div>
      <label className="checkbox__label" htmlFor={`${label}-checkbox`}>{label}</label>
    </span>
  );
}

export default Checkbox;
