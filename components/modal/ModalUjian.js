import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { typeUang } from "@helpers/unit";
import DropYear from "@components/DropYear";
import NumberFormat from "react-number-format";
import {
  useUpdateExcelPayment,
  useUpdateJumlahTagihan,
} from "@services/payment";
import { toast } from "react-toastify";
import * as xlsx from "xlsx";

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

const schema = yup
  .object({
    typeUang: yup.string().required(),
    tanggalTunggakan: yup.string().required(),
    tahun: yup.string().required(),
    tanggalDenda: yup.string().required(),
    uploadFile: yup.mixed().required("File is required"),
  })
  .required();

export function ModalUjian({ open, onClose }) {
  const { mutate: updateExcel } = useUpdateExcelPayment();
  const { mutate: updateJumlahTagihan } = useUpdateJumlahTagihan();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [tipe, setTipe] = useState(null);
  if (!open) return null;

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

  const readUploadFile = (data) => {
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
    const fileEx = data.uploadFile[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const result = processExcel(fileReader.result);
      updateJumlahTagihan(
        {
          result,
        },
        {
          onSuccess: (data) => {
            toast.success(data);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      // updateExcel(
      //   {
      //     detail: {
      //       typeUang: data.typeUang,
      //       tanggalDenda: data.tanggalDenda,
      //       tanggalTunggakan: data.tanggalTunggakan,
      //       tahun: data.tahun,
      //     },
      //     data: result,
      //   },
      //   {
      //     onSuccess: (data) => {
      //       toast.success(data);
      //     },
      //     onError: (error) => {
      //       console.log(error);
      //     },
      //   }
      // );
    };
    fileReader.readAsBinaryString(fileEx);
  };

  function processExcel(data) {
    const workbook = xlsx.read(data, { type: "binary" });
    const firstSheet = workbook.SheetNames[0];
    const excelRows = xlsx.utils.sheet_to_row_object_array(
      workbook.Sheets[firstSheet]
    );
    return excelRows;
  }

  const handleUpdatePaymentwithExcelFile = async (data) => {
    readUploadFile(data);
    // toast("Payment berhasil dibuat !!!");
    // reset("", {
    //   keepValues: false,
    // });
    // onClose();
  };

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="flex justify-center mb-6">
          <span className="text-xl text-black">
            Tambah Payment dengan Excel File
          </span>
        </div>
        {/* <div className="min-w-full mb-2 text-black"> */}
        <form onSubmit={handleSubmit(handleUpdatePaymentwithExcelFile)}>
          <select
            className="w-full xl:w-[1000px] select select-bordered mb-2"
            {...register("typeUang")}
            onChange={(e) => setTipe(e.target.value)}
          >
            <option value="">Tipe Penambahan Uang</option>
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
          {tipe !== null && (
            <div className="mt-2 mb-2">
              <label htmlFor="upload" className="mr-5 text-center text-black">
                Upload File
              </label>
              <input
                // {...register("fileUpload")}
                type="file"
                name="upload"
                id="upload"
                onChange={(e) => setValue("uploadFile", e.target.files)}
                className="text-center text-black "
              />
            </div>
          )}

          <div className="flex items-center">
            <span className="mr-4 text-black">Tahun Ajaran : </span>
            <DropYear register={register} />
          </div>
          {errors.tahun && (
            <p className="text-xl text-red-600">Tahun is required field</p>
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
