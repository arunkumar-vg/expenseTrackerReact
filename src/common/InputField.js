import React from "react";

const InputCommon = ({
  label,
  type = "text",
  customClass,
  placeholder,
  value,
  ...rest
}) => {

  return (
    <div>
      <label className="d-flex justify-content-start w-100">{label}</label>
      <input
        type={type}
        className={`${customClass} form-control`}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default InputCommon;
