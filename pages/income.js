import Datedown from "@components/datedown";
import Dashboard from "layout/dashboard";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import { format } from "date-fns";
import { useCountIncome } from "@services/payment";
import TableIncome from "@components/tableIncome";
import { numberWithCommas, pathByUnit } from "@helpers/help";
import Loading from "@components/loading";
import * as xlsx from "xlsx";

function Income() {
  const { mutate: countIncome } = useCountIncome();
  const [dataIncome, setDataIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleSubmit = async (item) => {
    setLoading(true);
    const start_date = format(new Date(item.selection.startDate), "yyyy-MM-dd");
    const end_date = format(new Date(item.selection.endDate), "yyyy-MM-dd");
    setState([item.selection]);
    await countIncome(
      {
        start_date,
        end_date,
      },
      {
        onSuccess: (data) => {
          setLoading(false);
          setDataIncome(data);
        },

        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  const reTotal = useCallback(() => {
    let total = 0;
    let other = {};

    let iuran = {};
    let category = {
      "KB/TK MARIA YACHINTA": {},
      "SD MARIA FRANSISKA": {},
      "SMP PAX ECCLESIA": {},
      "SMA PAX PATRIAE": {},
    };

    let caraBayar = {
      "KB/TK MARIA YACHINTA": {},
      "SD MARIA FRANSISKA": {},
      "SMP PAX ECCLESIA": {},
      "SMA PAX PATRIAE": {},
    };
    dataIncome.map((item) => {
      if (other[item.caraBayar] === undefined) {
        other[item.caraBayar] = item.jumlahTagihan;
      } else if (other[item.caraBayar] !== undefined) {
        other[item.caraBayar] += item.jumlahTagihan;
      }

      if (iuran[item.iuran] === undefined) {
        iuran[item.iuran] = item.jumlahTagihan;
      } else if (iuran[item.iuran] !== undefined) {
        iuran[item.iuran] += item.jumlahTagihan;
      }

      if (item.unit === "KB/TK MARIA YACHINTA") {
        if (category["KB/TK MARIA YACHINTA"][item.iuran] === undefined) {
          category["KB/TK MARIA YACHINTA"][item.iuran] = item.jumlahTagihan;
        } else if (category["KB/TK MARIA YACHINTA"][item.iuran] !== undefined) {
          category["KB/TK MARIA YACHINTA"][item.iuran] += item.jumlahTagihan;
        }

        if (caraBayar["KB/TK MARIA YACHINTA"][item.caraBayar] === undefined) {
          caraBayar["KB/TK MARIA YACHINTA"][item.caraBayar] =
            item.jumlahTagihan;
        } else if (
          caraBayar["KB/TK MARIA YACHINTA"][item.caraBayar] !== undefined
        ) {
          caraBayar["KB/TK MARIA YACHINTA"][item.caraBayar] +=
            item.jumlahTagihan;
        }
      } else if (item.unit === "SD MARIA FRANSISKA") {
        if (category["SD MARIA FRANSISKA"][item.iuran] === undefined) {
          category["SD MARIA FRANSISKA"][item.iuran] = item.jumlahTagihan;
        } else if (category["SD MARIA FRANSISKA"][item.iuran] !== undefined) {
          category["SD MARIA FRANSISKA"][item.iuran] += item.jumlahTagihan;
        }

        if (caraBayar["SD MARIA FRANSISKA"][item.caraBayar] === undefined) {
          caraBayar["SD MARIA FRANSISKA"][item.caraBayar] = item.jumlahTagihan;
        } else if (
          caraBayar["SD MARIA FRANSISKA"][item.caraBayar] !== undefined
        ) {
          caraBayar["SD MARIA FRANSISKA"][item.caraBayar] += item.jumlahTagihan;
        }
      } else if (item.unit === "SMP PAX ECCLESIA") {
        if (category["SMP PAX ECCLESIA"][item.iuran] === undefined) {
          category["SMP PAX ECCLESIA"][item.iuran] = item.jumlahTagihan;
        } else if (category["SMP PAX ECCLESIA"][item.iuran] !== undefined) {
          category["SMP PAX ECCLESIA"][item.iuran] += item.jumlahTagihan;
        }
        if (caraBayar["SMP PAX ECCLESIA"][item.caraBayar] === undefined) {
          caraBayar["SMP PAX ECCLESIA"][item.caraBayar] = item.jumlahTagihan;
        } else if (
          caraBayar["SMP PAX ECCLESIA"][item.caraBayar] !== undefined
        ) {
          caraBayar["SMP PAX ECCLESIA"][item.caraBayar] += item.jumlahTagihan;
        }
      } else if (item.unit === "SMA PAX PATRIAE") {
        if (category["SMA PAX PATRIAE"][item.iuran] === undefined) {
          category["SMA PAX PATRIAE"][item.iuran] = item.jumlahTagihan;
        } else if (category["SMA PAX PATRIAE"][item.iuran] !== undefined) {
          category["SMA PAX PATRIAE"][item.iuran] += item.jumlahTagihan;
        }

        if (caraBayar["SMA PAX PATRIAE"][item.caraBayar] === undefined) {
          caraBayar["SMA PAX PATRIAE"][item.caraBayar] = item.jumlahTagihan;
        } else if (caraBayar["SMA PAX PATRIAE"][item.caraBayar] !== undefined) {
          caraBayar["SMA PAX PATRIAE"][item.caraBayar] += item.jumlahTagihan;
        }
      }

      total += Number(item.jumlahTagihan);
    });

    return (
      <div className="p-4 mt-6 space-y-3 text-white rounded-lg ">
        <div className="w-full p-4 mb-10 text-xl text-center text-black bg-white border-4 border-b-8 border-black">
          <p>Jumlah Uang: Rp {numberWithCommas(total)}</p>
        </div>

        <div className="flex justify-center">
          <div className="w-full p-4 mb-10 text-lg text-center text-black bg-white border-4 border-b-8 border-black">
            {Object.keys(other).map((item) => {
              return (
                <p>
                  {item} : Rp {numberWithCommas(other[item])}
                </p>
              );
            })}
          </div>

          <div className="w-full p-4 mb-10 text-lg text-center text-black bg-white border-4 border-b-8 border-black">
            {Object.keys(iuran).map((item) => {
              return (
                <p>
                  {item} : Rp {numberWithCommas(iuran[item])}
                </p>
              );
            })}
          </div>
        </div>

        <div className="w-full p-4 mb-10 text-lg text-center text-black bg-white border-4 border-b-8 border-black">
          <div>
            {Object.keys(category).map((item) => {
              return (
                <div className="border-2 border-black">
                  <span>
                    <p>{item}</p>
                  </span>

                  <div className="flex items-center justify-between p-2">
                    <span>
                      {Object.keys(category[item]).map((iuran) => {
                        return (
                          <p>
                            {iuran} : Rp{" "}
                            {numberWithCommas(category[item][iuran])}{" "}
                          </p>
                        );
                      })}
                    </span>

                    <span>
                      {Object.keys(caraBayar[item]).map((iuran) => {
                        return (
                          <p>
                            {iuran} : Rp{" "}
                            {numberWithCommas(caraBayar[item][iuran])}{" "}
                          </p>
                        );
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }, [dataIncome]);

  const reTotalIuran = useCallback(() => {
    let total = 0;
    let other = {};
    dataIncome.map((item) => {
      if (other[item.iuran] === undefined) {
        other[item.iuran] = item.jumlahTagihan;
      } else if (other[item.iuran] !== undefined) {
        other[item.iuran] += item.jumlahTagihan;
      }

      total += Number(item.jumlahTagihan);
    });

    return (
      <div className="items-center justify-center p-4 mt-6 text-center text-white bg-black rounded-lg">
        {/* <p>Jumlah Uang: Rp {numberWithCommas(total)}</p> */}
        {Object.keys(other).map((item) => {
          return (
            <p>
              Jumlah {item} : Rp {numberWithCommas(other[item])}
            </p>
          );
        })}
      </div>
    );
  }, [dataIncome]);

  const generateFile = () => {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(dataIncome);
    xlsx.utils.book_append_sheet(wb, ws, "MyFile");
    xlsx.writeFile(wb, `income.xlsx`);
  };

  return (
    <Dashboard title="Income">
      <>
        <Head>
          <title>Income</title>
        </Head>
      </>
      <div className="flex items-center justify-between p-2">
        <Datedown state={state} onHandleSubmit={handleSubmit} />
        {/* {dataIncome.length !== 0 ? (
          <a
            className="p-2 text-lg text-white rounded-md bg-blueSky"
            onClick={generateFile}
          >
            Download
          </a>
        ) : null} */}
      </div>
      {dataIncome.length !== 0 ? <div className="">{reTotal()}</div> : null}

      {loading === false ? <TableIncome data={dataIncome} /> : <Loading />}
    </Dashboard>
  );
}

export default Income;

export const getServerSideProps = async (ctx) => {
  if (ctx.req.cookies["nextauth.user"] === undefined) {
    return {
      redirect: {
        destination: "/login", //usually the login page
        permanent: false,
      },
    };
  }
  const user = JSON.parse(await ctx.req.cookies["nextauth.user"]);
  if (user.role !== "admin" && user.role !== "fotocopy") {
    return {
      redirect: {
        destination: pathByUnit(user.role), //usually the login page
        permanent: false,
      },
    };
  }
  if (user.role === "fotocopy") {
    return {
      redirect: {
        destination: "/fotocopy", //usually the login page
        permanent: false,
      },
    };
  }
  return {
    props: {
      authenticated: true,
    },
  };
};
