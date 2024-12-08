// Button.js
import React from "react";

const Button = ({ text, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800 transition duration-300 ease-in-out `}
    >
      {text}
    </button>
  );
};

export default Button;
