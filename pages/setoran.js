import React, { useState } from "react";
import Dashboard from "../layout/dashboard";
import Head from "next/head";
import Datedown from "@components/datedown";
import { useForm, Controller } from "react-hook-form";
import Input from "@components/Input";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { useCreateDeposit } from "@services/payment";

function setoran() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutate: createDepost } = useCreateDeposit();

  const [startDate, setStartDate] = useState(new Date());
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const submitSetoran = (data) => {
    if (data.txid === "") {
      toast.error("Tolong isi nomor transaksi");
      return;
    }
    try {
      createDepost({
        txid: data.txid,
        tanggalDeposit: startDate,
      });
      toast.success("Data sudah ditambahkan");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSu = async (item) => {
    setLoading(true);
    const start_date = format(new Date(item.selection.startDate), "yyyy-MM-dd");
    const end_date = format(new Date(item.selection.endDate), "yyyy-MM-dd");
    setState([item.selection]);
  };

  const handleChange = (date) => {
    setStartDate(date);
  };
  return (
    <Dashboard title="Setoran">
      <>
        <Head>
          <title>Setoran</title>
        </Head>
      </>

      <form className="" onSubmit={handleSubmit(submitSetoran)}>
        <Input
          label="Masukkan nomor transaksi"
          value="txid"
          data=""
          register={register}
        />
        <div className="mb-2 text-black ">
          <span>Pilih tanggal Setoran : </span>
          <DatePicker
            selected={startDate}
            onChange={handleChange}
            className="w-full text-center text-black border-2 rounded-lg"
          />
        </div>
        <button className="btn btn-primary w-[100%] ">Tambah Data</button>
      </form>
      <div className="flex items-center justify-between p-2">
        <Datedown state={state} onHandleSubmit={handleSubmit} />
      </div>
    </Dashboard>
  );
}

export default setoran;
