import { useTable, usePagination, useFilters, useRowSelect } from "react-table";
import { useContext, useMemo, useState } from "react";
import { Columns } from "./headers";
import { useRouter } from "next/router";
import { Checkbox } from "./CheckBox";
import { useDeleteStudent } from "services/student";
import { toast } from "react-toastify";
import { ModalDelete } from "components/modal/ModalDelete";
import { AuthContext } from "@context/AuthContext";
import { AiFillDelete } from "react-icons/ai";

function TableStudent({ datas }) {
  const { user } = useContext(AuthContext);
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => datas, []);
  const [showDeleteStudent, setShowDeleteStudent] = useState(false);
  const router = useRouter();
  const { mutate: deleteStudent } = useDeleteStudent();

  const tabelInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    usePagination,
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
      toast.warn("Silakan pilih murid yang ingin dihapus !!!");
      setShowDeleteStudent(false);
      return;
    } else if (selectedFlatRows.length > 1) {
      toast.warn("Murid hanya bisa dihapus 1 per satu");
      setShowDeleteStudent(false);
      return;
    }

    deleteStudent(selectedFlatRows[0].values.id, {
      onSuccess: (data) => {
        if (data.affected === 1) {
          toast("Murid sudah berhasil dihapus !!!");
          setShowDeleteStudent(false);
          router.push("/");
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div className="overflow-auto">
      {user.role === "admin" && (
        <button
          className="flex p-2 text-xl text-black bg-red-400 rounded-lg"
          onClick={() => setShowDeleteStudent(true)}
        >
          <AiFillDelete className="w-6 h-6 mr-1 outline-none" />
          Delete Student
        </button>
      )}

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

                  <div className="mt-2">
                    {column.canFilter ? column.render("Filter") : null}
                  </div>
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
      <ModalDelete
        open={showDeleteStudent}
        onClose={() => setShowDeleteStudent(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default TableStudent;
