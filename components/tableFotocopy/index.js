import { useTable, usePagination, useFilters, useRowSelect } from "react-table";
import { useContext, useMemo, useState } from "react";
import { Columns } from "./headers";
import { useRouter } from "next/router";
import { Checkbox } from "../tableStudent/CheckBox";
import { useDeleteStudent } from "services/student";
import { toast } from "react-toastify";
import { ModalDelete } from "components/modal/ModalDelete";
import { AuthContext } from "@context/AuthContext";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { useDeleteFotocopy } from "@services/fotocopy";
import ModalFotocopy from "@components/modal/ModalFotocopy";
import { useQueryClient } from "react-query";
import { ModalEditFotocopy } from "@components/modal/ModalEditFotocopy";

function TableFotocopy({
  datas,
  showDeleteStudent,
  setShowDeleteStudent,
  refetch,
}) {
  const { user } = useContext(AuthContext);

  const data = useMemo(() => datas, []);

  const [showEdit, setshowEdit] = useState(false);
  const [dataTempEdit, setDataTempEdit] = useState({});
  const { mutate: deleteFotocopy } = useDeleteFotocopy();
  const columns = useMemo(() => Columns(setshowEdit, setDataTempEdit), []);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: deleteStudent } = useDeleteStudent();

  const tabelInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: columns.map((column) => {
          if (column.isVisible === false) return column.accessor || column.id;
        }),
      },
    },
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      // if (user.role === "admin") {
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
      // }
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    selectedFlatRows,
  } = tabelInstance;
  const { globalFilter, pageIndex, pageSize } = state;

  const handleDelete = () => {
    if (selectedFlatRows.length === 0) {
      toast.warn("Silakan pilih fotocopy yang ingin dihapus !!!");
      setShowDeleteStudent(false);
      return;
    } else if (selectedFlatRows.length > 1) {
      toast.warn("fotocopy hanya bisa dihapus 1 per satu");
      setShowDeleteStudent(false);
      return;
    }

    deleteFotocopy(selectedFlatRows[0].values.id, {
      onSuccess: (data) => {
        if (data.affected === 1) {
          queryClient.invalidateQueries(["fotocopy"]);
          toast("fotocopy sudah berhasil dihapus !!!");
          setShowDeleteStudent(false);
          refetch();
          // router.push("/fotocopy");
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div className="overflow-auto">
      <span className="flex justify-between ">
        <span>
          <button
            className="flex p-3 mt-4 text-xl text-black bg-red-400 rounded-lg"
            onClick={() => setShowDeleteStudent(true)}
          >
            <AiFillDelete className="w-6 h-6 mr-1 outline-none" />
            Delete Fotocopy
          </button>
        </span>

        {/* <span>
          <button
            className="btn btn-accent"
            onClick={() => setOpenCreateFotocopy(true)}
          >
            <AiOutlinePlus className="w-6 h-6 mr-2" />
            Tambah Fotocopy
          </button>
        </span> */}
      </span>
      {/* {user.role === "admin" && (
        <button
          className="flex p-2 text-xl text-black bg-red-400 rounded-lg"
          onClick={() => setShowDeleteStudent(true)}
        >
          <AiFillDelete className="w-6 h-6 mr-1 outline-none" />
          Delete Fotocopy
        </button>
      )} */}

      <table
        {...getTableProps()}
        className="w-full mt-4 bg-blue-400 border-collapse"
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

                  {/* <div className="mt-2">
                    {column.canFilter ? column.render("Filter") : null}
                  </div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="text-center border-4 cursor-pointer"
        >
          {page.map((row, index) => {
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
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="flex items-center justify-center mt-4"> */}
      <div className="grid content-center grid-cols-8 gap-1 mt-4 text-black bg-white justify-items-center place-items-center">
        <span className="">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          className="p-2 text-black bg-gray-400 rounded-lg outline-none"
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          className="p-2 text-black bg-gray-400 rounded-lg outline-none"
          disabled={!canNextPage}
        >
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
        <span>| Go to page: </span>
        <input
          type="number"
          className="p-1 pl-2 text-black bg-white border-2 border-black rounded-xl"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          style={{ width: "50px" }}
        />
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="p-1 text-white bg-black rounded-xl"
        >
          {[10, 25].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <ModalEditFotocopy
        open={showEdit}
        onClose={() => setshowEdit(false)}
        data={dataTempEdit}
        refetch={refetch}
      />
      <ModalDelete
        open={showDeleteStudent}
        onClose={() => setShowDeleteStudent(false)}
        handleDelete={handleDelete}
        refetch={refetch}
      />
    </div>
  );
}

export default TableFotocopy;
