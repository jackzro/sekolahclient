import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Close({ onClose }) {
  return (
    <div className="w-[100%] flex items-end justify-end">
      <button
        className="p-2 text-2xl text-red-500 rounded-md"
        onClick={onClose}
      >
        <AiOutlineCloseCircle className="w-10 h-10" />
      </button>
    </div>
  );
}

export default Close;
