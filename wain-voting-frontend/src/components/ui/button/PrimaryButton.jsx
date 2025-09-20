import React from "react";

function PrimaryButton({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition duration-300 
        bg-primary text-white 
        dark:bg-primary dark:text-white
        hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
