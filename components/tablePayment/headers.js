import { BayarSekarang, EditButton } from "./options";
import { StatusPembayaran } from "./StatusPembayaran";

export const Columns = (setShowEdit, setDataTempEdit, role) => {
  return [
    {
      Header: "ID",
      accessor: "id",
      isVisible: false,
    },
    {
      Header: "Periode",
      accessor: "period",
    },
    {
      Header: "Student ID",
      accessor: "student.id",
    },
    {
      Header: "Name",
      accessor: "student.name",
    },
    {
      Header: "Kelas",
      accessor: "student.grade",
    },
    {
      Header: "Bulan Iuran",
      accessor: "bulanIuran",
    },
    {
      Header: "Iuran",
      accessor: "iuran",
    },
    {
      Header: "Jumlah Tagihan",
      accessor: "jumlahTagihan",
    },
    {
      Header: "Jumlah Denda",
      accessor: "jumlahDenda",
    },
    {
      Header: "Cara Bayar",
      accessor: "caraBayar",
    },

    {
      Header: "Jumlah Bayar",
      accessor: "jumlahBayar",
    },
    {
      Header: "Edit By",
      accessor: "userBayar",
    },
    {
      Header: "Tanggal Bayar",
      accessor: "tanggalBayar",
      Cell: (data) => {
        if (data.cell.row.values.tanggalBayar === null) {
          return "";
        } else {
          return `${new Date(
            data.cell.row.values.tanggalBayar
          ).toLocaleDateString()}`;
        }
      },
    },
    // {
    //   Header: "Jumlah Bayar",
    //   accessor: "jumlahBayar",
    // },
    {
      Header: "Status",
      accessor: "statusBayar",
      Cell: (data) => {
        return <StatusPembayaran status={data.cell.row.values.statusBayar} />;
      },
    },
    {
      Header: "Action",
      accessor: "jumlahAdmin",
      // isVisible: false,
      isVisible: role === "admin" ? true : false,
      Cell: (data) => {
        return (
          <EditButton
            data={data.cell.row.values}
            setShowEdit={setShowEdit}
            setDataTempEdit={setDataTempEdit}
          />
        );
      },
    },

    // {
    //   Header: "Option",
    //   // accessor: "id",
    //   Cell: (data) => {
    //     return <BayarSekarang data={data.cell.row.values} />;
    //   },
    //   disableFilters: true,
    // },
  ];
};
