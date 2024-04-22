import CreateFotocopy from "@components/CreateFotocopy";
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
  width: "800px",
  height: "70%",
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

function ModalFotocopy({ open, onClose, id, data, handleMutate, refetch }) {
  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <CreateFotocopy onClose={onClose} refetch={refetch} />
      </div>
    </>
  );
}

export default ModalFotocopy;
