import { useTable } from "react-table";
import { useMemo } from "react";
import { Columns } from "./headers";
import { useRouter } from "next/router";

function Table({ datas }) {
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => datas, []);
  const router = useRouter();

  const tabelInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tabelInstance;

  const clickHandlerGetStudentByUnit = async (unit) => {
    router.push(`/unit/${unit}`);
  };

  return (
    <div className="p-4">
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
                className="bg-black border-4"
              >
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    className="px-2 py-2 text-white border-4 border-collapse"
                    onClick={() => clickHandlerGetStudentByUnit(cell.value)}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
