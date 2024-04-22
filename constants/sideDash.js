import { AiFillHome, AiFillFileExcel } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { FcMoneyTransfer } from "react-icons/fc";
import { BiBook } from "react-icons/bi";

export const SIDEBAR_MENUS = [
  { title: "Home", pathname: "/", icon: <AiFillHome /> },
  { title: "Pembayaran", pathname: "/pembayaran", icon: <FaMoneyBillWave /> },
  { title: "Laporan", pathname: "/laporan", icon: <HiDocumentReport /> },
  { title: "File", pathname: "/file", icon: <AiFillFileExcel /> },
  { title: "Income", pathname: "/income", icon: <FcMoneyTransfer /> },
  { title: "Fotocopy", pathname: "/fotocopy", icon: <BiBook /> },
  // { title: "Raport", pathname: "/raport", icon: <FcMoneyTransfer /> },
];

export const BANK_MENUS = [
  { title: "Home", pathname: "/unit/[unit]", icon: <AiFillHome /> },
  { title: "Laporan", pathname: "/laporan", icon: <HiDocumentReport /> },
];

export const FOTOCOPY_MENUS = [
  { title: "Fotocopy", pathname: "/fotocopy", icon: <BiBook /> },
];
