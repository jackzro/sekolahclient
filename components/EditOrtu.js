import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";

function EditOrtu({ data, id, onClose, handleMutate }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onHandleSubmit = async (data) => {
    data.id = id;
    handleMutate(data);
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col">
        <div className="flex gap-10">
          <div className="flex flex-col space-y-6">
            <Input
              label="Nama Ayah"
              value="fatherName"
              data={data}
              register={register}
            />
            <Input
              label="Nama Ibu"
              value="motherName"
              data={data}
              register={register}
            />
            <Input
              label="Nomor Ayah"
              value="fatherNumber"
              data={data}
              register={register}
              type="number"
            />
            <Input
              label="Nomor Ibu"
              value="motherNumber"
              type="number"
              data={data}
              register={register}
            />
          </div>
          <div className="flex flex-col space-y-6">
            <Input
              label="Pendidikan Ayah"
              value="pendidikanAyah"
              data={data}
              register={register}
            />
            <Input
              label="Pendidikan Ibu"
              value="pendidikanIbu"
              data={data}
              register={register}
            />
            <Input
              label="Pekerjaan Ayah"
              value="pekerjaanAyah"
              data={data}
              register={register}
            />
            <Input
              label="Pekerjaan Ibu"
              value="pekerjaanIbu"
              data={data}
              register={register}
            />
          </div>
          <div className="flex flex-col space-y-6">
            <Input
              label="Nama Wali"
              value="namaWali"
              data={data}
              register={register}
            />
            <Input
              label="Hubungan Wali"
              value="hubunganWali"
              data={data}
              register={register}
            />
            <Input
              label="Pendidikan Wali"
              value="pendidikanWali"
              data={data}
              register={register}
            />
            <Input
              label="Pekerjaan Wali"
              value="pekerjaanWali"
              data={data}
              register={register}
            />
          </div>
        </div>
        <div className="flex flex-row mt-10 space-x-6">
          <button type="submit" className=" btn btn-primary w-[50%]">
            Submit
          </button>
          <button
            type="button"
            className=" btn btn-secondary w-[50%]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditOrtu;
