import React from "react";

const Button = ({ className, children, ...rest }) => {
  return (
    <button
      className={`w-full py-2 bg-blue-1 rounded-lg text-white font-semibold ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
