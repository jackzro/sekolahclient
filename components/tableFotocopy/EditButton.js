import { FaEdit } from "react-icons/fa";

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
