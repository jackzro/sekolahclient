import React, { useState } from "react";

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

export function ModalBatalPayment({ open, onClose, handleDelete }) {
  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="mb-6">
          <span className="text-lg text-blue-600">
            Apakah kamu yakin untuk membatalkan pembayaran ?{" "}
          </span>
        </div>

        <div className="flex flex-row items-center justify-center space-x-3">
          <button onClick={handleDelete} className="btn btn-success">
            Ya
          </button>

          <button onClick={onClose} className="btn btn-warning">
            Belum
          </button>
        </div>
      </div>
    </>
  );
}
