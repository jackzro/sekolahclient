import EditOrtu from "@components/EditOrtu";
import React from "react";

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
  height: "75%",
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

export function ModalEditOrtu({ open, onClose, id, data, handleMutate }) {
  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <EditOrtu
          onClose={onClose}
          data={data}
          id={id}
          handleMutate={handleMutate}
        />
      </div>
    </>
  );
}
