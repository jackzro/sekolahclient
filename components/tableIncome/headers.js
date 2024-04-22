import { numberWithCommas } from "@helpers/help";
import {
  MultiSelectColumnFilter,
  SelectColumnFilter,
  SelectColumnOnChange,
} from "./filter";

export const Columns = [
  {
    Header: "ID",
    accessor: "student.id",
    disableFilters: true,
  },
  {
    Header: "Name",
    accessor: "student.name",
    disableFilters: true,
  },
  //   {
  //     Header: "Iuran",
  //     columns: [
  //       {
  //         Header: "Iuran",
  //         accessor: "iuran",
  //         Filter: MultiSelectColumnFilter,
  //         filter: "multiple",
  //       },
  //     ],
  //   },
  {
    Header: "Iuran",
    accessor: "iuran",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "Detail",
    accessor: "bulanIuran",
    disableFilters: true,
  },

  {
    Header: "Cara Bayar",
    accessor: "caraBayar",
    Filter: SelectColumnFilter,
    filter: "includes",
  },
  {
    Header: "Jumlah",
    accessor: "jumlahTagihan",
    disableFilters: true,
    Cell: ({ value }) => {
      return "Rp " + numberWithCommas(value);
    },
  },
  {
    Header: "Tanggal Bayar",
    accessor: "tanggalBayar",
    disableFilters: true,
    Cell: ({ value }) => {
      const tanggalBayar = new Date(value).toLocaleDateString();
      return tanggalBayar;
    },
  },
  //   {
  //     Header: "Status",
  //     accessor: "statusBayar",
  //     Cell: ({ value }) => {
  //       const bool = String(value);
  //       if (bool === "true") {
  //         return "Sudah";
  //       }
  //       return "Belum";
  //     },
  //   },
];
