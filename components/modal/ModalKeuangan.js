import { useGroupByPeriod, useUpdateUangSekolah } from "@services/student";
import React, { useState } from "react";
import { FcBullish, FcDeleteDatabase } from "react-icons/fc";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { numberWithCommas } from "@helpers/help";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Close from "./Close";

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

export function ModalKeuangan({
  open,
  onClose,
  id,
  setDetail,
  setOpenPayment,
  setDataPayment,
  setPaid,
}) {
  const { data, isLoading } = useGroupByPeriod(id);
  const { mutate: uangSekolahUpdate } = useUpdateUangSekolah();
  const [tahun, setTahun] = useState("");
  const { errors, control, setValue, handleSubmit } = useForm();
  const router = useRouter();

  if (!open) return null;

  const keuanganHandler = (status) => {
    if (status === "paid") {
      setDetail(true);
    } else {
      setDetail(false);
    }
    const filterData = data[tahun].filter((payment) => {
      if (payment.statusBayar === status) return payment;
    });
    setDataPayment(filterData);
    setOpenPayment(true);
    onClose();
  };

  const updateUangSekolah = (data) => {
    if (isNaN(data.uangSekolah) || data.uangSekolah === "") {
      toast.error("Tolong isi nilai Uang Sekolah yang diinginkan!!!");
      return;
    }
    uangSekolahUpdate(
      { period: tahun, uangSekolah: data.uangSekolah, id: id },
      {
        onSuccess: async (data) => {
          toast.success("Uang Sekolah sudah diupdate!!!");
          onClose();
          router.push("/student/payment/" + id);
        },
        onError: async (data) => {
          console.log(data);
        },
      }
    );
  };

  const handleModalDetailKeuangan = () => {};

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <Close onClose={onClose} />
        {isLoading === false && data.length !== 0 && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <select
              className="w-full max-w-xs select select-bordered"
              onChange={(e) => setTahun(e.target.value)}
            >
              <option value="">Pilih Tahun Ajaran</option>
              {Object.keys(data).map((key, index) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </select>

            {tahun !== "" && (
              <div>
                <div className="flex items-center justify-center">
                  <span className="p-2 text-white bg-black rounded-lg">
                    Uang Sekolah: Rp{" "}
                    {numberWithCommas(data[tahun][0].student.uangSekolah)}
                  </span>
                </div>

                <div className="flex items-center justify-center mt-2 mb-6">
                  <form onSubmit={handleSubmit(updateUangSekolah)}>
                    <Controller
                      control={control}
                      name="uangSekolah"
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                      }) => (
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

                    <button
                      className="p-2 ml-6 text-white bg-green-600 rounded-xl"
                      type="submit"
                    >
                      Ubah Uang Sekolah
                    </button>
                  </form>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="flex flex-row items-center p-10 py-20 space-x-6 bg-gray-800 rounded-lg cursor-pointer"
                    onClick={() => {
                      keuanganHandler(true);
                      setPaid(true);
                    }}
                  >
                    <FcBullish className="w-12 h-12" />
                    <span className="text-white">Tagihan yang dibayar</span>
                  </button>

                  <button
                    className="flex flex-row items-center p-10 py-20 space-x-6 bg-red-800 rounded-lg cursor-pointer"
                    onClick={() => {
                      keuanganHandler(false);
                      setPaid(false);
                    }}
                  >
                    <FcDeleteDatabase className="w-12 h-12" />
                    <span className="text-white">Tagihan yang tertunda</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
