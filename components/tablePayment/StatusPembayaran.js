import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { AiOutlineCheckCircle } from "react-icons/ai";

export function StatusPembayaran({ status }) {
  return (
    <div className="flex items-center justify-center">
      {status === false ? (
        <RiCloseCircleFill className="w-6 h-6 mr-1 text-red-600 outline-none" />
      ) : (
        <AiOutlineCheckCircle className="w-6 h-6 mr-1 text-green-600 outline-none" />
      )}
    </div>
  );
}
