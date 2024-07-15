import React from "react";
interface ButtonCompProps {
  loading: boolean;
  text: string;
  onClick: () => void;
}
export const Button = ({ loading, text, onClick }: ButtonCompProps) => {
  return (
    <button
      className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4
      focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm
      px-5 py-2.5 text-center"
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <div className="inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-t-4 border-blue-200 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};
