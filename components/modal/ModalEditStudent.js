import EditStudent from "@components/EditStudent";
import React from "react";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  borderRadius: 6,
  width: "1000px",
  height: "95%",
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

export function ModalEditStudent({ open, onClose, id, data, handleMutate }) {
  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <EditStudent
          onClose={onClose}
          data={data}
          id={id}
          handleMutate={handleMutate}
        />
      </div>
    </>
  );
}
