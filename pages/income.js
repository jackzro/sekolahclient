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
    dataIncome.map((item) => {
      if (other[item.caraBayar] === undefined) {
        other[item.caraBayar] = item.jumlahTagihan;
      } else if (other[item.caraBayar] !== undefined) {
        other[item.caraBayar] += item.jumlahTagihan;
      }

      total += Number(item.jumlahTagihan);
    });
    return (
      <div className="items-center justify-center p-4 mt-6 text-center text-white rounded-lg bg-info">
        <p>Jumlah Uang: Rp {numberWithCommas(total)}</p>
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
      {dataIncome.length !== 0 ? reTotal() : null}

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
