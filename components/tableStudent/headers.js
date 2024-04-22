import { SelectColumnFilter, ColumnFilter } from "./filter";
import Option from "./options";

export const Columns = [
  {
    Header: "StudentID",
    accessor: "id",
    Filter: ColumnFilter,
  },
  {
    Header: "Name",
    accessor: "name",
    Filter: ColumnFilter,
  },
  {
    Header: "Kelas",
    accessor: "grade",
    Filter: SelectColumnFilter,
    filter: "include",
  },
  {
    Header: "Option",
    // accessor: "id",
    Cell: (data) => {
      return <Option data={data.cell.row.values} />;
    },
    disableFilters: true,
  },
];
