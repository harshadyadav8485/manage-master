import React from "react";

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options,
  loading,
  disabled,
}) => (
  <div className="flex-1 min-w-[150px]">
    <label className="block">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full p-2"
      disabled={disabled || loading}
    >
      <option value="">
        {loading ? `Loading ${label}...` : `Select a ${label}`}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
