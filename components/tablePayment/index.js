import { useTable, useRowSelect } from "react-table";
import { useContext, useMemo } from "react";
import { Columns } from "./headers";
import { Checkbox } from "./Checkbox";
import { FaFileInvoice } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { MdGppGood } from "react-icons/md";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoi from "@components/invoi";
import { useEffect, useState } from "react";
import {
  useUpdateStatusPayment,
  useDeleteStudentPaymentById,
  useBatalPayment,
  useUpdateStatusDenda,
} from "@services/student";
import { useUangDendaById } from "@services/payment";
import { Modal } from "@components/modal/Modal";
import { ModalDelete } from "@components/modal/ModalDelete";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { ModalBatalPayment } from "@components/modal/ModalBatalPayment";
import { useRouter } from "next/router";
import { AuthContext } from "@context/AuthContext";
import { ModalEditPayment } from "@components/modal/ModalEditPayment";
import { numberWithCommas } from "helpers/help";

function TablePayment({ datas, detail, onClose, role }) {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showBatal, setshowBatal] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const [dataTempEdit, setDataTempEdit] = useState({});
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const columns = useMemo(
    () => Columns(setshowEdit, setDataTempEdit, role),
    []
  );
  const data = useMemo(() => datas, []);
  const [payment, setPayment] = useState([]);
  // const { data: dataDenda, isLoading } = useUangDendaById(router.query.id);
  const { mutate: handleUpdateStatusPayment } = useUpdateStatusPayment();
  const { mutate: deletePayment } = useDeleteStudentPaymentById();
  const { mutate: cancelPayment } = useBatalPayment();
  // const { mutate: handleUpdateStatusDenda } = useUpdateStatusDenda();

  const tabelInstance = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: columns.map((column) => {
          if (column.isVisible === false) return column.accessor || column.id;
        }),
      },
    },
    useRowSelect,
    (hooks) => {
      if (user.role === "admin") {
        hooks.visibleColumns.push((columns) => {
          return [
            {
              id: "selection",
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }) => (
                <Checkbox {...row.getToggleRowSelectedProps()} />
              ),
            },
            ...columns,
          ];
        });
      }
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = tabelInstance;

  useEffect(() => {
    handleSelectedRow();
  }, [selectedFlatRows]);

  const handleSelectedRow = async () => {
    const target = await selectedFlatRows.map((row) => row.original);
    setPayment(target);
  };
  const closeModalHandler = () => setShow(false);

  const bayarTunai = (date, tipepayment, kodeTransaksi) => {
    let detail = {
      data: payment,
      tanggalBayar: date,
      tipepayment,
      kodeTransaksi,
    };
    handleUpdateStatusPayment(detail);
    setShow(false);
    toast("Pembayaran sudah diupdate");
  };
  const handleDelete = () => {
    deletePayment(payment);
    setShowDelete(false);
    toast("Item sudah berhasil dihapus");
  };

  const batalkanPayment = () => {
    cancelPayment(payment);
    toast("Payment sudah dibatalkan");
    router.push("/student/payment/" + datas[0].student.id);
  };
  return (
    <div className="overflow-auto">
      {user.role === "admin" && (
        <div className="flex items-center justify-between">
          <div>
            <button
              className="flex items-center justify-center p-3 mb-2 text-black bg-red-400 rounded-md"
              onClick={() => setShowDelete(true)}
            >
              <AiFillDelete className="w-6 h-6 mr-1 outline-none" />
              <span className="text-sm">Hapus</span>
            </button>
            {/* {isLoading !== true && (
              <button
                className={`flex items-center justify-center p-3 mb-2 text-black ${
                  dataDenda.statusDenda === false
                    ? "bg-green-500"
                    : "bg-red-600"
                }  rounded-md`}
                onClick={() => {
                  handleUpdateStatusDenda({
                    id: router.query.id,
                    status: `${dataDenda.statusDenda === false ? true : false}`,
                  });
                  router.reload();
                }}
              >
                <MdGppGood className="w-6 h-6 mr-1 outline-none" />
                <span className="text-sm">
                  {dataDenda.statusDenda === false
                    ? "Aktifkan Denda"
                    : "Non Aktifkan Denda"}
                </span>
              </button>
            )} */}
          </div>
          {/* {isLoading !== true && (
            <div>
              <p className="text-xl text-black">
                Status Denda :{" "}
                {dataDenda.statusDenda === false ? "Tidak Aktif" : "Aktif"}
              </p>

              <p className="text-xl text-black">
                Uang Denda : Rp {numberWithCommas(dataDenda.uangDenda)}
              </p>
            </div>
          )} */}
          {router.pathname === "/student/[id]" && (
            <button className="btn btn-info" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      )}

      {detail === true && role === "admin" && (
        <button
          className="p-2 text-black bg-orange-500 rounded-lg"
          onClick={batalkanPayment}
        >
          Batalkan Pembayaran
        </button>
      )}

      {detail === true ? (
        <>
          {" "}
          {payment.length !== 0 && (
            <div title="Save PDF">
              <PDFDownloadLink
                document={<Invoi data={payment} />}
                fileName={`invoice.pdf`}
                aria-label="Save PDF"
              >
                <div className="flex items-center justify-center p-3 text-black bg-green-400 rounded-md">
                  <FaFileInvoice className="w-6 h-6 mr-1 outline-none" />
                  <span className="text-sm">Cetak</span>
                  <span className="text-sm">Invoice</span>
                </div>
              </PDFDownloadLink>
            </div>
          )}
        </>
      ) : (
        <div className="flex space-x-2">
          {payment.length !== 0 && (
            <button
              className="flex items-center justify-center p-3 text-black bg-green-400 rounded-md"
              onClick={() => setShow(true)}
            >
              <BsCashCoin className="w-6 h-6 mr-1 outline-none" />
              <span className="text-sm">Bayar</span>
              <span className="text-sm">Tunai</span>
            </button>
          )}

          {payment.length !== 0 && (
            <div title="Save PDF">
              <PDFDownloadLink
                document={<Invoi data={payment} />}
                fileName={`invoice.pdf`}
                aria-label="Save PDF"
              >
                <div className="flex items-center justify-center p-3 text-black bg-green-400 rounded-md">
                  <FaFileInvoice className="w-6 h-6 mr-1 outline-none" />
                  <span className="text-sm">Cetak</span>
                  <span className="text-sm">Invoice</span>
                </div>
              </PDFDownloadLink>
            </div>
          )}
        </div>
      )}

      <table
        {...getTableProps()}
        className="w-full mt-4 bg-blue-400 border-collapse "
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={index}
              className="p-4"
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="sticky top-0 p-4 text-white bg-blue-600 border-4 border-collapse"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="text-center border-4 cursor-pointer"
        >
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={index}
                className="bg-gray-600 border-4"
              >
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    className="px-2 py-2 text-white border-4 border-collapse"
                    // onClick={() => clickHandlerGetStudentByUnit(cell.value)}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        open={show}
        onClose={() => setShow(false)}
        bayarTunai={bayarTunai}
      ></Modal>

      <ModalDelete
        open={showDelete}
        onClose={() => setShowDelete(false)}
        handleDelete={handleDelete}
      ></ModalDelete>

      <ModalBatalPayment
        open={showBatal}
        onClose={() => setshowBatal(false)}
        handleDelete={batalkanPayment}
      ></ModalBatalPayment>
      <ModalEditPayment
        open={showEdit}
        onClose={() => setshowEdit(false)}
        data={dataTempEdit}
      ></ModalEditPayment>
    </div>
  );
}

export default TablePayment;
