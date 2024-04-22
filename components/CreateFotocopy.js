import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import Input from "@components/Input";
import { BiCloset } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useCreateFotocopy } from "@services/fotocopy";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

const schema = yup
  .object({
    tanggalFotocopy: yup.string().required(),
    jumlahFotocopy: yup.string().required(),
    keperluan: yup.string().required(),
  })
  .required();

function CreateFotocopy({ onClose, refetch }) {
  const router = useRouter();
  const { mutate: createFotocopy } = useCreateFotocopy();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = async (data) => {
    createFotocopy(data, {
      onSuccess: (yolo) => {
        queryClient.invalidateQueries(["fotocopy"]);
        toast.success("data sudah ditambahkan");
        refetch();
        onClose();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="w-full space-y-6">
      <span className="flex items-center justify-between w-full">
        <span className="text-xl text-black">Create New Fotocopy</span>
        <span>
          <button
            className="flex p-2 text-xl text-black rounded-lg"
            onClick={onClose}
          >
            <MdClose className="w-10 h-10 mr-1 text-red-600 outline-none" />
          </button>
        </span>
      </span>

      <section className="w-full mt-2 ">
        <label className="mb-4 text-black">Tanggal Fotocopy :</label>
        <Controller
          control={control}
          name="tanggalFotocopy"
          className="w-full input"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select date"
              onChange={(e) => field.onChange(e)}
              selected={field.value}
              // onChange={handleChange}
              className="w-full mt-2 text-center text-black border-2 border-black rounded-lg"
            />
          )}
        />
      </section>

      <section className="mt-2">
        <label className="mb-4 text-black">Jumlah Fotocopy :</label>

        <Controller
          control={control}
          name="jumlahFotocopy"
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <NumberFormat
              className="w-full p-1 text-black border-2 border-black rounded-lg"
              thousandSeparator
              // {...field}
              prefix=""
              onValueChange={(values) => {
                onChange(values.value);
                return values.value;
              }}
              value={value}
            />
          )}
        />
      </section>

      <Input label="Keperluan" value="keperluan" register={register} />

      <button className="w-full p-4 text-white bg-blue-500 rounded-lg">
        Submit
      </button>
    </form>
  );
}

export default CreateFotocopy;
