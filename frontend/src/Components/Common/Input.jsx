import React from "react";
import crossIcon from "../../assets/forms/crossIcon.svg";
const InputCross = ({ className, right, empty, show, ...rest }) => {
  return (
    <div className={`relative flex`}>
      <input
        // value={value}
        // onChange={onChange}
        className={`rounded-md py-1 pl-2 pr-32 outline-none h-9 w-full bg-white text-sm text-gray-8 ${
          rest?.disabled ? "opacity-50" : ""
        }  ${className}`}
        // placeholder={placeholder}
        // onKeyDown={onKeyDown}
        maxLength={51}
        {...rest}
      />
      {/*  */}
      {/* {value !== null && value != "" && showClear && ( */}
      {show && (
        <img
          src={crossIcon}
          className="absolute w-5 h-9 right-2 cursor-pointer"
          onClick={empty}
        />
      )}
      <p
        className={`absolute w-5 h-9 right-14 top-1 cursor-pointer  ${
          rest?.disabled ? "opacity-50" : ""
        }`}
      >
        {right}
      </p>
      {/* )} */}
    </div>
  );
};

export default InputCross;
