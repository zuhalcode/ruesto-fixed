import React from "react";

export default function Input({
  type = "text",
  className = "",
  value = "",
  handleOnChange = () => {},
  placeholder = "",
  name = "",
}) {
  return (
    <input
      type={type}
      name={name}
      className={`mt-3 w-full rounded-sm px-3 py-2 outline-none ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={handleOnChange}
      autoComplete="off"
      required
    />
  );
}
