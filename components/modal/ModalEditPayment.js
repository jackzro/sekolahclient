import { numberWithCommas } from "@helpers/help";
import { useEditPaymentById } from "@services/payment";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "60px",
  zIndex: 1000,
  borderRadius: 6,
  width: "1000px",
  height: "60%",
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

export function ModalEditPayment({ open, onClose, data, handleMutate }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const { mutate: editPayment } = useEditPaymentById();
  if (!open) return null;

  const onHandleSubmit = (amount) => {
    data.amount = amount;
    editPayment(data, {
      onSuccess: async (data) => {
        toast.success("Jumlah Tagihan / Denda sudah diganti!!!");
        onClose();
      },
      onError: async (data) => {
        toast.warn(data.message);
      },
    });
  };
  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="w-[100%] flex justify-between items-center mb-2">
          <p className="p-2 text-xl text-blue-500 bg-black rounded-lg">
            Edit Payment
          </p>
          <button
            className="items-end p-2 text-xl text-white bg-blue-500 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="flex mb-5 space-x-10">
          <div>
            <p className="text-xl text-black">Student ID</p>
            <p className="text-xl text-black">Nama</p>
            <p className="text-xl text-black">Iuran</p>
            <p className="text-xl text-black">Jumlah Tagihan</p>
            <p className="text-xl text-black">Jumlah Denda</p>
          </div>
          <div>
            <p className="text-xl text-black">: {data["student.id"]}</p>
            <p className="text-xl text-black">: {data["student.name"]}</p>
            <p className="text-xl text-black">: {data["iuran"]}</p>
            <p className="text-xl text-black">
              : Rp. {numberWithCommas(data["jumlahTagihan"])}
            </p>
            <p className="text-xl text-black">
              : Rp. {numberWithCommas(data["jumlahDenda"])}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="mb-2">
            <label className="text-lg text-black">
              Ubah Tagihan menjadi :{" "}
            </label>
            <Controller
              control={control}
              name="jumlahTagihan"
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
          </div>
          <div className="mb-2">
            <label className="text-lg text-black">Ubah Denda menjadi : </label>
            <Controller
              control={control}
              name="jumlahDenda"
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
          </div>
          <button
            type="submit"
            className="w-[100%] bg-blue-500 p-2 mt-4 rounded-lg text-white text-xl"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
