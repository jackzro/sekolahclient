import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { typeGrup, typeUang, typeUnit } from "@helpers/unit";
import DropYear from "@components/DropYear";
import NumberFormat from "react-number-format";
import {
  useCreateUangKegiatan,
  useCreateUangKegiatanByIdSiswa,
  useCreateUangLainnyaByIdSiswa,
  useCreateUangLainnya,
} from "@services/payment";
import { toast } from "react-toastify";
import Input from "@components/Input";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
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

let schema = yup.object().shape({
  jenis: yup.string().required(),
  idSiswa: yup.string().when("jenis", {
    is: "Perorangan",
    then: yup.string().required(),
  }),
  type: yup.string().when("jenis", {
    is: "Perunit",
    then: yup.string().required(),
  }),
  grade: yup.string().when("jenis", {
    is: "Perunit",
    then: yup.string().required(),
  }),
  jumlahTagihan: yup.string().required(),
  tanggalTunggakan: yup.string().required(),
  tahun: yup.string().required(),
  tanggalDenda: yup.string().required(),
  typeUang: yup.string().required(),
});

export function ModalKegiatan({ open, onClose }) {
  const { mutate: createUangKeg } = useCreateUangKegiatan();
  const { mutate: createUangKegByIdSiswa } = useCreateUangKegiatanByIdSiswa();
  const { mutate: createUangLain } = useCreateUangLainnya();
  const { mutate: createUangLainByIdSiswa } = useCreateUangLainnyaByIdSiswa();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [unit, setUnit] = useState([]);
  const [jenis, setJenis] = useState("");

  const handleChange = (date) => {
    setStartDate(date);
    setShow(true);
  };
  const handleClose = () => {
    onClose();
    reset("", {
      keepValues: false,
    });
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
  };

  const grupHandler = (jenisgrup) => {
    setJenis(jenisgrup);
    if (jenisgrup === "Perorangan") {
      setUnit([]);
    } else if (jenisgrup === "Perunit") {
    }
  };
  const handleBayar = async (data) => {
    const tanggalTunggakanConvert = new Date(data.tanggalTunggakan);
    const tanggalDendaConvert = new Date(data.tanggalDenda);
    const tunggakTanggal = `${
      tanggalTunggakanConvert.getMonth() + 1
    }/${tanggalTunggakanConvert.getDate()}/${tanggalTunggakanConvert.getFullYear()}`;
    const dendaTanggal = `${
      tanggalDendaConvert.getMonth() + 1
    }/${tanggalDendaConvert.getDate()}/${tanggalDendaConvert.getFullYear()}`;
    data.tanggalTunggakan = tunggakTanggal;
    data.tanggalDenda = dendaTanggal;
    if (data.jenis === "Perunit") {
      createUangLain(data);
    } else if (data.jenis === "Perorangan") {
      createUangLainByIdSiswa(data);
    }
    toast("Uang Kegiatan berhasil dibuat !!!");
    reset("", {
      keepValues: false,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="flex justify-center mb-6">
          <span className="text-xl text-black">Penambahan Uang Lainnya</span>
        </div>
        {/* <div className="min-w-full mb-2 text-black"> */}
        <form onSubmit={handleSubmit(handleBayar)}>
          <select
            className="w-full xl:w-[1000px] select select-bordered mb-2"
            {...register("typeUang")}
          >
            <option value="">Tipe penambahan uang</option>
            {typeUang.map((data) => (
              <option value={data.name} key={data.id}>
                {data.name}
              </option>
            ))}
          </select>

          {errors?.typeUang?.type === "required" && (
            <p className="text-xl text-red-600">
              Tipe penambahan uang is required field
            </p>
          )}

          <select
            className="w-full xl:w-[1000px] select select-bordered mb-2"
            {...register("jenis")}
            onChange={(e) => grupHandler(e.target.value)}
          >
            <option value="">Jenis penambahan</option>
            {typeGrup.map((data) => (
              <option value={data.name} key={data.id}>
                {data.name}
              </option>
            ))}
          </select>

          {errors?.jenis?.type === "required" && (
            <p className="text-xl text-red-600">
              Jenis penambahan is required field
            </p>
          )}

          {jenis === "Perorangan" && (
            <Input label="ID Siswa" value="idSiswa" register={register} />
          )}

          {errors?.idSiswa?.type === "required" && (
            <p className="text-xl text-red-600">ID Siswa is required field</p>
          )}

          {jenis === "Perunit" && (
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
          )}

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
          {unit.length !== 0 && errors.grade && (
            <p className="text-xl text-red-600">Grade is required field</p>
          )}
          <div className="flex items-center">
            <span className="mr-4 text-black">Tahun Ajaran : </span>
            <DropYear register={register} />
          </div>
          {errors.tahun && (
            <p className="text-xl text-red-600">Tahun is required field</p>
          )}

          <section className="flex items-center">
            <label className="mr-2 text-black">Jumlah Tagihan : </label>
            <Controller
              control={control}
              name="jumlahTagihan"
              className="input"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <NumberFormat
                  className="p-1 text-black border-2 border-black rounded-lg"
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
          {errors.uangKegiatan && (
            <p className="text-xl text-red-600">
              Jumlah Tagihan is required field
            </p>
          )}
          <section className="mt-2">
            <label className="mb-4 text-black">Tanggal Tunggakan :</label>
            <Controller
              control={control}
              name="tanggalTunggakan"
              className="input"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(e) => field.onChange(e)}
                  selected={field.value}
                  // onChange={handleChange}
                  className="mt-2 text-center text-black border-2 border-black rounded-lg"
                />
              )}
            />
          </section>

          {errors.tanggalTunggakan && (
            <p className="text-xl text-red-600">
              Tanggal Tunggakan is required field
            </p>
          )}
          <section className="mt-2">
            <label className="mb-4 text-black">Tanggal Denda:</label>
            <Controller
              control={control}
              name="tanggalDenda"
              className="input"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(e) => field.onChange(e)}
                  selected={field.value}
                  // onChange={handleChange}
                  className="mt-2 text-center text-black border-2 border-black rounded-lg"
                />
              )}
            />
          </section>

          {errors.tanggalDenda && (
            <p className="text-xl text-red-600">
              Tanggal Denda is required field
            </p>
          )}
          <div className="flex items-center justify-center mt-10 space-x-10">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
            <button onClick={handleClose} className="btn btn-warning">
              Cancel
            </button>
          </div>
        </form>

        {/* </div> */}

        <div className="flex flex-row items-center justify-center space-x-3">
          {show && (
            <button
              // onClick={handleBayar}
              className="btn btn-success"
            >
              Ya
            </button>
          )}
        </div>
      </div>
    </>
  );
}
