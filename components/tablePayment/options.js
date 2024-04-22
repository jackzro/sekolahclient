import { BsCashCoin } from "react-icons/bs";
import { FaFileInvoice, FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";

export function BayarSekarang({ data }) {
  const router = useRouter();
  return (
    <div className="flex space-x-2">
      <div className="flex items-center justify-center p-3 text-black bg-green-400 rounded-md">
        <BsCashCoin className="w-6 h-6 mr-1 outline-none" />
        <span className="text-sm">Bayar</span>
        <span className="text-sm">Tunai</span>
      </div>
      <div
        className="flex items-center justify-center p-3 text-black bg-green-400 rounded-md"
        onClick={() => console.log(data)}
      >
        <FaFileInvoice className="w-6 h-6 mr-1 outline-none" />
        <span className="text-sm">Cetak</span>
        <span className="text-sm">Invoice</span>
      </div>
    </div>
  );
}

export const EditButton = ({ data, setShowEdit, setDataTempEdit }) => {
  const editHandler = () => {
    setDataTempEdit(data);
    setShowEdit(true);
  };

  return (
    <button
      className="flex p-2 text-black bg-green-500 rounded-md"
      onClick={editHandler}
    >
      <FaEdit className="w-5 h-5 outline-none" />
      Edit
    </button>
  );
};
