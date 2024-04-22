import React, { memo } from "react";

function customTable({ datas }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-compact">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Lokasi</th>
            <th>vBCA KODE</th>
            <th>Tanggal Transaksi</th>
            <th>Waktu Transaksi</th>
            <th>Total Pembayaran</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data) => (
            <tr key={data.no} className="text-center">
              <th>{data.no}</th>
              <td>{data.name}</td>
              <td>{data.lokasi}</td>
              <td>{data.vBcaKode}</td>
              <td>{data.tanggalTransaksi}</td>
              <td>{data.waktuTransaksi}</td>
              <td>{data.totalPembayaran}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default customTable;
