"use client";
import React from "react";

interface InputCompProps {
  label: string;
  type: "email" | "password" | "text";
  placeholder: string;
  value: string;
  setValue: (val: string) => void;
  displayText: string;
  errorMessage: string;
  leftIcon?: React.ReactNode;
  helperText?: string;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const Input = ({
  label,
  type,
  placeholder,
  value,
  setValue,
  displayText,
  errorMessage,
  leftIcon,
  helperText,
  rightIcon,
  onRightIconClick,
}: InputCompProps) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {displayText}
        {helperText && (
          <span className="text-xs font-medium text-gray-400">
            {helperText}
          </span>
        )}
      </label>
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          name={label}
          id={label}
          className={`bg-gray-50 border ${
            errorMessage ? "border-red-500" : "border-gray-300"
          } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full ${
            leftIcon ? "pl-10" : ""
          } p-2.5 ${rightIcon ? "pr-10" : ""}`}
          placeholder={placeholder}
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
            <button
              type="button"
              onClick={onRightIconClick}
              className="focus:outline-none"
            >
              {rightIcon}
            </button>
          </div>
        )}
      </div>
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};
