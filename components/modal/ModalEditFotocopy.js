import Input from "@components/Input";
import { numberWithCommas } from "@helpers/help";
import { useEditPaymentById } from "@services/payment";
import DatePicker from "react-datepicker";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { useEditFotocopy } from "@services/fotocopy";

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

export function ModalEditFotocopy({
  open,
  onClose,
  data,
  handleMutate,
  refetch,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const { mutate: editFotocopy } = useEditFotocopy();
  if (!open) return null;

  const onHandleSubmit = (inputData) => {
    if (
      new Date(inputData.tanggalFotocopy).toLocaleDateString() ===
      new Date(data.tanggalFotocopy).toLocaleDateString()
    ) {
      inputData.tanggalFotocopy = new Date(
        data.tanggalFotocopy
      ).toLocaleDateString();
    }

    inputData.id = data.id;

    editFotocopy(inputData, {
      onSuccess: async (data) => {
        toast.success("Fotocopy sudah diganti!!!");
        refetch();
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
            Edit Fotocopy
          </p>
          <button
            className="items-end p-2 text-xl text-white bg-blue-500 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onHandleSubmit)}
          className="w-full space-y-6"
        >
          <section className="w-full mt-2 ">
            <label className="mb-4 text-black">Tanggal Fotocopy :</label>
            <Controller
              control={control}
              name="tanggalFotocopy"
              className="w-full input"
              defaultValue={new Date(data.tanggalFotocopy)}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(e) => field.onChange(e)}
                  selected={field.value}
                  //   value={new Date(data.tanggalFotocopy).toLocaleDateString()}
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
              defaultValue={data.jumlah}
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

          <Input
            label="Keperluan"
            value="keperluan"
            register={register}
            data={data}
          />

          <button className="w-full p-4 text-white bg-blue-500 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
