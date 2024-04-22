import DropYear from "@components/DropYear";
import { typeUnit } from "@helpers/unit";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useToGetID, useAddStudent } from "services/student";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NumberFormat from "react-number-format";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "25px",
  zIndex: 1000,
  borderRadius: 6,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

const schema = yup
  .object({
    type: yup.string().required(),
    name: yup.string().required(),
    uangSekolah: yup.number().required(),
    grade: yup.string().required(),
    tahun: yup.string().required(),
  })
  .required();

function ModalCreateStudent({ open, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate: getID } = useToGetID();
  const [id, setId] = useState("");
  const { mutate: addStudent } = useAddStudent();
  const [unit, setUnit] = useState([]);

  if (!open) return null;

  const onHandleSubmit = (data) => {
    const { type, name, uangSekolah, grade, tahun } = data;
    if (type === "KB&TK MARIA YACHINTA") {
      addStudent({
        unit: "KB/TK MARIA YACHINTA",
        name,
        uangSekolah,
        id: id.toString(),
        grade,
        tahun,
      });
    } else {
      addStudent({
        unit: type,
        name,
        uangSekolah,
        id: id.toString(),
        grade,
        tahun,
      });
    }
    toast("Berhasil menambahkan siswa. ");
    reset();
    onClose();
  };

  const unitHandler = async (e) => {
    switch (e.target.value) {
      case "KB&TK MARIA YACHINTA":
        setUnit(typeUnit[0].grade);
        break;
      case "SD MARIA FRANSISKA":
        setUnit(typeUnit[1].grade);
        break;
      case "SMP PAX ECCLESIA":
        setUnit(typeUnit[2].grade);
        break;
      case "SMA PAX PATRIAE":
        setUnit(typeUnit[3].grade);
        break;
    }
    if (e.target.value === "KB&TK MARIA YACHINTA") {
      getID(
        { unit: "KB/TK MARIA YACHINTA" },
        {
          onSuccess: async (data) => {
            setId(data + 1);
          },
          onError: async (data) => {
            console.log(data);
          },
        }
      );
    } else {
      getID(
        { unit: e.target.value },
        {
          onSuccess: async (data) => {
            setId(data + 1);
          },
          onError: async (data) => {
            console.log(data);
          },
        }
      );
    }
  };

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="">
          <div className="flex flex-col items-center justify-center">
            <span className="mb-4 text-xl text-black">Tambah Data Siswa</span>
            {id !== "" && (
              <span className="p-2 my-2 text-white bg-black rounded-lg">
                ID : {id}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <select
              className="w-full xl:w-[1000px] select select-bordered mb-2"
              {...register("type")}
              onChange={unitHandler}
            >
              <option value="">Unit</option>
              {typeUnit.map((data) => (
                <option value={data.name} key={data.id}>
                  {data.name}
                </option>
              ))}
            </select>

            {errors.type && (
              <p className="text-xl text-red-600">Unit is required field</p>
            )}

            {unit.length !== 0 && (
              <select
                className="w-full xl:w-[1000px] select select-bordered mb-2"
                {...register("grade")}
              >
                <option value="">Kelas</option>
                {unit.map((data) => (
                  <option value={data} key={data}>
                    {data}
                  </option>
                ))}
              </select>
            )}
            {errors.grade && unit.length !== 0 && (
              <p className="text-xl text-red-600">{errors.grade.message}</p>
            )}
            <span className="text-black">Tahun Ajaran : </span>
            <DropYear register={register} />

            {errors.tahun && (
              <p className="text-xl text-red-600">{errors.tahun.message}</p>
            )}
            <input
              {...register("name")}
              type="text"
              placeholder="Nama Siswa"
              className="w-full xl:w-[1000px] input input-bordered mb-2 mt-2"
            />
            {errors.name && (
              <p className="text-xl text-red-600">{errors.name.message}</p>
            )}

            <section className="flex items-center mt-2 mb-10">
              <label className="mr-2 text-black">Uang Sekolah : </label>
              <Controller
                control={control}
                name="uangSekolah"
                className="input"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <NumberFormat
                    className="p-2 text-black border-2 border-black rounded-lg"
                    thousandSeparator
                    // {...field}
                    prefix="Rp "
                    onValueChange={(values) => {
                      onChange(values.value);
                      return values.value;
                    }}
                    value={value}
                  />
                )}
              />
            </section>
            {/* <input
              {...register("uangSekolah")}
              type="number"
              placeholder="Uang Sekolah"
              className="w-full xl:w-[1000px] input input-bordered mb-2"
            /> */}
            {errors.uangSekolah && (
              <p className="text-xl text-red-600">
                Uang Sekolah must be a number !!!
              </p>
            )}
            <div className="flex justify-between">
              <button className="btn btn-success" type="submit">
                Tambah
              </button>
              <button className="btn btn-warning" onClick={onClose}>
                Tutup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalCreateStudent;
