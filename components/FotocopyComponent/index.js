import { useFotocopy } from "@services/fotocopy";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

function FotocopyComponent({ setOpenCreateFotocopy }) {
  const { data: isLoading } = useFotocopy();
  return (
    <div className="flex">
      <span>
        <button
          className="btn btn-accent"
          onClick={() => setOpenCreateFotocopy(true)}
        >
          <AiOutlinePlus className="w-6 h-6 mr-2" />
          Tambah Fotocopy
        </button>
      </span>
    </div>
  );
}

export default FotocopyComponent;
