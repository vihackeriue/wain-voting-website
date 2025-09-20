import classNames from "classnames";
import React from "react";

function InputValue({
  children,
  value,
  placeholder,
  name = "text",
  type,
  className = "",
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm font-medium p-2">{children}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classNames(
          className,
          "mt-1 block w-full border px-3 py-1.5 rounded-md bg-dark-100 border-dark-50"
        )}
      />
    </div>
  );
}

export default InputValue;
