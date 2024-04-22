import { AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import { BiShowAlt } from "react-icons/bi";
import { MdPayments } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext";

function Option({ data }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center space-x-2">
      {user.role === "admin" && (
        <div
          className="flex justify-center item-center"
          onClick={() => router.push(`/student/${data.id}`)}
        >
          <AiFillEdit className="w-6 h-6 mr-1 outline-none" />
          <span>Edit</span>
        </div>
      )}

      <div
        className="flex justify-center item-center"
        onClick={() => router.push(`/student/payment/${data.id}`)}
      >
        <MdPayments className="w-6 h-6 mr-1 outline-none" />
        <span>Payment</span>
      </div>

      <div
        className="flex justify-center item-center"
        onClick={() => router.push(`/student/detail/${data.id}`)}
      >
        <BiShowAlt className="w-6 h-6 mr-1 outline-none" />
        <span>Detail</span>
      </div>
    </div>
  );
}

export default Option;
