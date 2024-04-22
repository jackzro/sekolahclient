import React from "react";
import { useForm } from "react-hook-form";

function DropDown({ datas, onHandleSubmit, tipe, setTipe }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div>
      <form className="flex space-x-6" onSubmit={handleSubmit(onHandleSubmit)}>
        <select
          className="w-full max-w-xs select select-bordered"
          {...register("type")}
          onChange={(e) => setTipe(e.target.value)}
        >
          <option value="">Tipe Tagihan</option>
          {datas.map((data) => (
            <option value={data.name} key={data.id}>
              {data.name}
            </option>
          ))}
        </select>
        {tipe !== "" && (
          <button className="text-black btn btn-success" type="submit">
            Generate
          </button>
        )}
      </form>
    </div>
  );
}

export default DropDown;
