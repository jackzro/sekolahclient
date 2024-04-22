import TablePayment from "@components/tablePayment";
import React, { useState } from "react";
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
  width: "1100px",
  height: "80%",
  overflow: "auto",
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

export function ModalPayment({ open, onClose, detail, data, role }) {
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        {/* <button className="btn btn-info" onClick={onClose}>
          Close
        </button> */}
        {detail === false ? (
          <>
            {data.length !== 0 ? (
              <TablePayment datas={data} onClose={onClose} role={role} />
            ) : (
              <div className="flex flex-col justify-center text-2xl text-black">
                <div className="flex justify-center">
                  <p>Tidak ada tagihan yang belum dibayar</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {data.length !== 0 ? (
              <TablePayment
                datas={data}
                detail={true}
                onClose={onClose}
                role={role}
              />
            ) : (
              <div>
                <Close onClose={onClose} />
                <div className="flex flex-col justify-center text-2xl text-black">
                  <div className="flex justify-center">
                    <p>Belum ada pembayaran yang dilakukan</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
