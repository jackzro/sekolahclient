import { EditButton } from "./EditButton";

export const Columns = (setShowEdit, setDataTempEdit, role) => {
  return [
    {
      Header: "ID",
      accessor: "id",
      isVisible: false,
    },
    {
      Header: "Tanggal",
      accessor: "tanggalFotocopy",
      Cell: (data) => {
        const newDate = new Date(
          data.cell.row.values.tanggalFotocopy
        ).toLocaleDateString();
        return newDate;
      },
    },
    {
      Header: "Jumlah",
      accessor: "jumlah",
    },
    {
      Header: "Keperluan",
      accessor: "keperluan",
    },
    {
      Header: "Action",
      accessor: "jumlahAdmin",
      // isVisible: false,
      // isVisible: role === "admin" ? true : false,
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
  ];
};
