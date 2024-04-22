import { typePembayaran } from "@helpers/unit";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

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

export function Modal({ open, onClose, bayarTunai }) {
  const [tipePayment, setTipePayment] = useState("");
  const [kodeTransaksi, setKodeTransaksi] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(false);
  if (!open) return null;
  const handleChange = (date) => {
    setStartDate(date);
    setShow(true);
  };

  const handleBayar = () => {
    if (kodeTransaksi === "" || tipePayment === "" || show !== true) {
      toast.error("isi semua data yang diperlukan");
      return;
    }

    bayarTunai(
      `${startDate.getFullYear()}-${
        startDate.getMonth() + 1
      }-${startDate.getDate()}`,
      tipePayment,
      kodeTransaksi
    );
  };

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="mb-6">
          <span className="text-lg text-blue-600">
            Pembayaran sudah selesai ?{" "}
          </span>
        </div>

        <div className="min-w-full mb-2 text-black">
          <span>Pilih tanggal Pembayaran : </span>
          <DatePicker
            selected={startDate}
            onChange={handleChange}
            className="w-full text-center text-black border-2 rounded-lg"
          />
        </div>

        <div className="min-w-full mb-2 text-white">
          <select
            className="w-full p-2 bg-black rounded-md"
            onChange={(e) => setTipePayment(e.target.value)}
          >
            <option value="">Tipe Pembayaran</option>
            {typePembayaran.map((data) => (
              <option value={data.name} key={data.id}>
                {data.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            className="min-w-full p-2 text-black rounded-md"
            placeholder="Masukkan Nomor Transaksi"
            type="text"
            onChange={(e) => setKodeTransaksi(e.target.value)}
          />
        </div>

        <div className="flex flex-row items-center justify-center p-2 space-x-3">
          {show && tipePayment !== "" && (
            <button onClick={handleBayar} className="btn btn-success">
              Ya
            </button>
          )}

          <button onClick={onClose} className=" btn btn-warning">
            Belum
          </button>
        </div>
      </div>
    </>
  );
}
