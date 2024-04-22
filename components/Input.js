import React from "react";

function Input({ register, label, value, data, type }) {
  return (
    <div className="mb-2">
      <label className="text-lg text-black">{label} : </label>
      <input
        {...register(value)}
        type={type === "number" ? "number" : "text"}
        placeholder={label}
        // className="w-full max-w-xs text-white input input-bordered"
        className="w-full p-2 text-black border-2 border-black rounded-lg"
        defaultValue={data !== undefined ? data[value] : ""}
      />
    </div>
  );
}

export default Input;
